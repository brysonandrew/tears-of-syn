import THREE = require('three');
import { playerPositionX, playerPositionZ, playerRotationY
} from "../../../../../../../../../../../../../data/helpers/controls/keyboard";

export class VisualBullets {

    flame = new THREE.Group;
    initialY = 9;
    posX;
    posZ;

    constructor() {}

    addFire(sourceObject) {
        const amount = 12;
        const scatterFwd = 5;
        const scatterSide = 0.5;

        const colors = new Float32Array( amount * 3 );
        const sizes = new Float32Array( amount );

        const vertex = new THREE.Vector3();
        const color = new THREE.Color( 0xffffff );

        const positions = new Float32Array( amount * 3 );

        positions.forEach((_, i) => {
            vertex.x = scatterSide * Math.random() * 2 - 1;
            vertex.y = 0;
            vertex.z = scatterFwd * Math.random() * 2 - 1;
            vertex.toArray((positions as any), i * 3);

            sizes[i] = i * 1.5;

            color.setHSL(0, 1, 0.6);
            color.toArray((colors as any), i * 3);
        });

        let geometry = new THREE.BufferGeometry();
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

        let fire = new THREE.Points( geometry, material );
        fire["life"] = 0;

        fire.position.set(
            sourceObject.pos.x + this.posX,
            sourceObject.pos.y + this.initialY,
            sourceObject.pos.z + this.posZ
        );

        fire.rotation.set(
            sourceObject.rot.x,
            sourceObject.rot.y,
            sourceObject.rot.z
        );

        this.flame.add(fire);
    }

    fireBullets(keysPressed, sourceObject) {
        const radius = 11;

        const rotY = sourceObject.rot.y + playerRotationY(keysPressed);

        this.flame.children.forEach((bullet, i) => {

            this.posX = radius * (bullet["life"] * 0.125) * -Math.sin(rotY) + playerPositionX(keysPressed, rotY) * 2;
            this.posZ = radius * (bullet["life"] * 0.125) * -Math.cos(rotY) + playerPositionZ(keysPressed, rotY) * 2;

            bullet.position.x += this.posX;
            bullet.position.z += this.posZ;

            if (bullet["life"] === 50) {
                this.flame.children.splice(i, 1);
            }
            bullet["life"]++;
        });
    }

    fire(isFiring, sourceObject, keysPressed) {
        this.fireBullets(keysPressed, sourceObject);
        if (isFiring) {
            this.addFire(sourceObject);
        }
    }

    render() {
        return this.flame;
    }
}
