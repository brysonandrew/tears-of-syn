import THREE = require('three');
import { createGun } from './gunParts';
import { easeMotion } from "../../../../../../../../../../../../data/helpers/controls/motion";
import { playerPositionX, playerPositionZ, playerRotationY
} from "../../../../../../../../../../../../data/helpers/controls/keyboard";

export class GatlingGun {

    gun = new THREE.Group;
    bullets = new THREE.Group;
    gunParts;
    gunBarrel;
    warmUp = 0;
    rate = 0;
    count = 0;
    barrelTurnRate = 0;
    gunRotateRate = 0;
    initialY = 9;
    initialZ = -4;

    assemble() {
        this.gun.add(createGun());
        this.gun.scale.set(0.2, 0.2, 0.2);
        this.gun.position.set(0, this.initialY, this.initialZ);
        this.gunParts = this.gun.children[0].children;
        this.gunBarrel = this.gunParts[this.gunParts.length - 1];
    }

    addBullet(sourceObject, keysPressed) {
        const amount = 12;
        const radius = 22;
        const scatterFwd = 5;
        const scatterSide = 0.5;

        const colors = new Float32Array( amount * 3 );
        const sizes = new Float32Array( amount );

        const vertex = new THREE.Vector3();
        const color = new THREE.Color( 0xffffff );

        const positions = new Float32Array( amount * 3 );

        const rotY = sourceObject.rotation.y + playerRotationY(keysPressed);

        const x = radius * -Math.sin(rotY) + playerPositionX(keysPressed, rotY) * 2;
        const z = radius * -Math.cos(rotY) + playerPositionZ(keysPressed, rotY) * 2;

        positions.forEach((_, i) => {
            vertex.x = scatterSide * Math.random() * 2 - 1;
            vertex.y = 0;
            vertex.z = scatterFwd * Math.random() * 2 - 1;
            vertex.toArray((positions as any), i * 3);

            sizes[i] = i * 1.5;

            color.setHSL(60, 1, 0.95);
            color.toArray((colors as any), i * 3);
        });

        const geometry = new THREE.BufferGeometry();
        geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
        geometry.addAttribute( 'customColor', new THREE.BufferAttribute( colors, 3 ) );
        geometry.addAttribute( 'size', new THREE.BufferAttribute( sizes, 1 ) );

        const material = new THREE.ShaderMaterial( {
            uniforms: {
                amplitude: { value: 1.0 },
                color:     { value: new THREE.Color( 0xffffff ) },
                texture:   { value: new THREE.TextureLoader().load( "/images/player/spark3.png" ) }
            },
            vertexShader:   `uniform float amplitude;
                                attribute float size;
                                attribute vec3 customColor;
                                varying vec3 vColor;
                            void main() {
                                vColor = customColor;
                                vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
                                gl_PointSize = size * ( 300.0 / -mvPosition.z );
                                gl_Position = projectionMatrix * mvPosition;
                            }`,
            fragmentShader: `uniform vec3 color;
                                uniform sampler2D texture;
                                varying vec3 vColor;
                            void main() {
                                gl_FragColor = vec4( color * vColor, 1.0 );
                                gl_FragColor = gl_FragColor * texture2D( texture, gl_PointCoord );
                            }`,
            blending:       THREE.AdditiveBlending,
            depthTest:      true,
            depthWrite:     false,
            transparent:    true
        } );

        const bullet = new THREE.Points( geometry, material );
        bullet["life"] = 0;

        bullet.position.set(
            sourceObject.position.x + x,
            sourceObject.position.y + this.initialY,
            sourceObject.position.z + z
        );

        bullet.rotation.set(
            sourceObject.rotation.x,
            sourceObject.rotation.y,
            sourceObject.rotation.z
        );

        this.bullets.add(bullet);
    }

    fireBullets() {
        this.bullets.children.forEach((bullet, i) => {
            if (bullet["life"] === 1) {
                this.bullets.children.splice(i, 1);
            }
            bullet["life"]++;
        });
    }

    fire(isFiring, sourceObject, keysPressed) {
        this.gunBarrel.rotation.z += easeMotion(isFiring, 5, 0.25, this.barrelTurnRate);
        this.fireBullets();
        if (isFiring) {
            this.addBullet(sourceObject, keysPressed);
        }
    }

    render() {
        return this.gun;
    }

    renderBullets() {
        return this.bullets;
    }
}
