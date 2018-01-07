import * as THREE from 'three';
import {FRAGMENT_SHADER} from 'utils/game';
import {VERTEX_SHADER} from '../../utils/game/shaders';

const CONFIG = {
    max: 20,
    amount: 40,
    radius: 180,
    size: 2,
    gravity: 0.04,
    color: 0xFFFFFF
};

export class AirParticles {

    particleImagePath = '/images/spark3.png';
    cluster = new THREE.Group;
    time = 0;

    addCluster() {
        const amount = CONFIG.amount;
        const radius = CONFIG.radius;

        const positions = new Float32Array( amount * 3 );
        const colors = new Float32Array( amount * 3 );
        const sizes = new Float32Array( amount );

        const vertex = new THREE.Vector3();
        const color = new THREE.Color( CONFIG.color );

        positions.forEach((_, i) => {
            vertex.x = (Math.random() * 2 - 1) * radius;
            vertex.y = (Math.random() * 2 - 1) * radius;
            vertex.z = (Math.random() * 2 - 1) * radius;
            (vertex as any).toArray(positions, i);

            sizes[i] = CONFIG.size + CONFIG.size * Math.random();

            color.setHSL(0, 1, 1);
            (color as any).toArray(colors, i * 3);
        });

        const geometry = new THREE.BufferGeometry();
        geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
        geometry.addAttribute( 'customColor', new THREE.BufferAttribute( colors, 3 ) );
        geometry.addAttribute( 'size', new THREE.BufferAttribute( sizes, 1 ) );

        const material = new THREE.ShaderMaterial( {
            uniforms: {
                amplitude: { value: 1.0 },
                color:     { value: new THREE.Color( CONFIG.color ) },
                texture:   { value: new THREE.TextureLoader().load( this.particleImagePath ) }
            },
            vertexShader:   VERTEX_SHADER,
            fragmentShader: FRAGMENT_SHADER,
            blending:       THREE.AdditiveBlending,
            depthTest:      false,
            transparent:    true
        } );

        const cluster = new THREE.Points( geometry, material );

        cluster.position.y = 160;
        cluster.position.z = -200;

        cluster['speed'] = 0.05 * Math.random() - 0.05 * Math.random();

        this.cluster.add(cluster);
    }

    fire() {
        if (this.cluster.children.length < CONFIG.max) {
            this.addCluster();
        }

        this.cluster.children.forEach(spark => {

            spark.position.x -= Math.tan(this.time * 0.002) * spark['speed'];
            spark.position.z -= Math.tan(this.time * 0.002) * spark['speed'];

            spark.position.y -= CONFIG.gravity * Math.random();

            spark['life']++;
        });
    }

    animate(docScroll) {
        this.time++;
        this.cluster.rotation.y = docScroll * 0.0001;
        this.fire();
    }

    render() {
        return this.cluster;
    }

}
