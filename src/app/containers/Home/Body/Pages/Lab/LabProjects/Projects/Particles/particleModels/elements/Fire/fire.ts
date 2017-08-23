import THREE = require('three');

export class Flame {

    cluster = new THREE.Group;
    count = 0;

    addCluster() {
        const amount = 10;
        const radius = 4;

        const positions = new Float32Array( amount * 3 );
        const colors = new Float32Array( amount * 3 );
        const sizes = new Float32Array( amount );

        const vertex = new THREE.Vector3();
        const color = new THREE.Color( 0xffffff );

        positions.forEach((_, i) => {
            vertex.x = (Math.random() * 2 - 1) * radius;
            vertex.y = (Math.random() * 2 - 1) * radius;
            vertex.z = (Math.random() * 2 - 1) * radius;
            (vertex as any).toArray(positions, i);

            sizes[i] = 20;

            color.setHSL(0.15 * ( i / amount ) - 0.005, 0.8, 0.6);
            (color as any).toArray(colors, i * 3);
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
            depthTest:      false,
            transparent:    true
        } );

        const cluster = new THREE.Points( geometry, material );

        cluster.position.x = (0.5 - Math.random()) * radius;
        cluster.position.y = (0.5 - Math.random()) * radius;
        cluster.position.z = (0.5 - Math.random()) * radius;
        cluster.rotation.x = Math.PI * 2 * Math.random();
        cluster.rotation.y = Math.PI * 2 * Math.random();
        cluster.rotation.z = Math.PI * 2 * Math.random();

        cluster["life"] = 0;

        this.cluster.add(cluster);
    }

    fire() {

        this.cluster.children.forEach((spark, i) => {

            spark.position.x += Math.cos(spark["life"]);
            spark.position.y += spark["life"] * 0.15;
            spark.position.z += Math.cos(spark["life"]);

            if (spark["life"] === 20) {
                this.cluster.children.splice(i, 1);
            }
            spark["life"]++;
        });
    }

    animate() {
        this.addCluster();

        this.fire();
    }

    render() {
        return this.cluster;
    }

}
