import THREE = require('three');

export class FireBlade {

    flame = new THREE.Group;
    initCount = 0;
    length = 4;
    gravity = 2;

    constructor() {
        this.flame.rotation.y = Math.PI;
        this.flame.rotation.z = Math.PI * 0.125;
    }

    addFire() {
        const amount = 20;
        const scatterSide = 2;

        const colors = new Float32Array( amount * 3 );
        const sizes = new Float32Array( amount );

        const vertex = new THREE.Vector3();
        const color = new THREE.Color( 0xffffff );

        const positions = new Float32Array( amount * 3 );

        positions.forEach((_, i) => {
            vertex.x = scatterSide * Math.random() * 2 - 1;
            vertex.y = this.length * Math.random() * 2 - 1;
            vertex.z = 0;
            vertex.toArray((positions as any), i * 3);

            sizes[i] = i * 0.1 + 10;

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

        const fire = new THREE.Points( geometry, material );
        fire["life"] = 0;

        fire.position.y = 40;

        // fire.rotation.set(
        //     this.flame.rotation.x,
        //     this.flame.rotation.y,
        //     this.flame.rotation.z
        // );

        this.flame.add(fire);
    }

    smoulder() {
        const maxIterations = 20;
        const maxLife = Math.PI * 2;

        this.flame.children.forEach((fire, i) => {

            fire.position.y += 0.005 * this.length - this.gravity;

            if (fire["life"] > maxLife) {
                this.flame.children.splice(i, 1);
            }

            fire["life"] += maxLife / maxIterations;
        });
    }

    animate() {

        this.smoulder();
        this.addFire();

    }

    render() {
        return this.flame;
    }
}
