import THREE = require('three');

export class BasicExplosion {

    explosion = new THREE.Group;
    initCount = 0;

    constructor() {
        this.explosion.rotation.y = Math.PI;
        this.explosion.rotation.z = Math.PI * 0.125;
    }

    addFire() {
        const amount = 1;

        const colors = new Float32Array( amount * 3 );
        const sizes = new Float32Array( amount );

        const vertex = new THREE.Vector3();
        const color = new THREE.Color( 0xffffff );

        const positions = new Float32Array( amount * 3 );

        positions.forEach((_, i) => {
            vertex.x = 0;
            vertex.y = 0;
            vertex.z = 0;
            vertex.toArray((positions as any), i * 3);

            sizes[i] = i * 0.1 + 2;

            color.setHSL(0, 1, 0.6);
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

        let fire = new THREE.Points( geometry, material );
        fire["life"] = 0;
        fire["randomX"] = (Math.random() * 2 - 1) * 0.25;
        fire["randomY"] = (Math.random() * 2 - 1) * 0.25;
        fire["randomZ"] = (Math.random() * 2 - 1) * 0.25;

        // fire.position.set(
        //     this.explosion.position.x,
        //     this.explosion.position.y,
        //     this.explosion.position.z
        // );

        // fire.rotation.set(
        //     this.explosion.rotation.x,
        //     this.explosion.rotation.y,
        //     this.explosion.rotation.z
        // );

        this.explosion.add(fire);
    }

    spark() {
        const maxIterations = 150;
        const maxLife = Math.PI * 2;
        const gravity = 0.025;

        this.explosion.children.forEach((fire, i) => {

            fire.position.x += fire["randomX"];
            fire.position.y += fire["randomY"] - gravity * fire["life"];
            fire.position.z += fire["randomZ"];

            if (fire["life"] > maxLife) {
                this.explosion.children.splice(i, 1);
            }

            fire["life"] += maxLife / maxIterations;
        });
    }

    animate() {

        this.spark();
        this.addFire();
        this.addFire();
        this.addFire();
        this.addFire();
        this.addFire();
        this.addFire();
        this.addFire();
        this.addFire();
        this.addFire();
        this.addFire();
        this.addFire();
        this.addFire();
        this.addFire();
        this.addFire();
        this.addFire();
        this.addFire();
        this.addFire();
        this.addFire();
        this.addFire();
        this.addFire();
    }

    render() {
        return this.explosion;
    }
}
