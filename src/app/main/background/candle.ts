import * as THREE from "three";
import {FRAGMENT_SHADER, VERTEX_SHADER} from '../../utils/game/shaders';

export const STICK = {
    segments: 10,
    radius: 0.8,
    height: 40,
    color: 0xFFFFFF
};

export const WICK = {
    width: 0.1,
    height: 2,
    depth: 0.1,
    color: 0x000000
};

const GRAVITY = 0.025;
const MAX_FLAME_LIFE = 0.15;
const DEATH_RATE = 0.006;

export class Candle {

    particleImagePath = "/images/spark3.png";
    candle = new THREE.Group;
    flame = new THREE.Group;
    main = new THREE.Group;
    wick = new THREE.Group;
    flameSize = 1;

    createStick() {
        const geometry = new THREE.CylinderGeometry( STICK.radius, STICK.radius, STICK.height, STICK.segments );
        const material = new THREE.MeshLambertMaterial( { color: STICK.color, transparent: true } );
        const stick = new THREE.Mesh( geometry, material );

        this.candle.add(stick);
    }

    createWick() {
        const geometry = new THREE.BoxGeometry( WICK.width, WICK.height, WICK.depth );
        const material = new THREE.MeshBasicMaterial( { color: WICK.color } );
        this.wick = new THREE.Mesh( geometry, material );
        this.wick.position.y = STICK.height * 0.5 + WICK.height * 0.5;

        this.candle.add(this.wick);
    }

    createGlow() {
        let light = new THREE.PointLight( 0xFFFFFF, 0.2, 0, 2 );
        light.position.y = WICK.height * 0.5;

        this.wick.add(light);
    }

    addCluster() {
        const amount = 10;
        const radius = 0.15;

        const alphas = new Float32Array( amount * 3 ); // 1 values per vertex
        const positions = new Float32Array( amount * 3 );
        const colors = new Float32Array( amount * 3 );
        const sizes = new Float32Array( amount );

        const vertex = new THREE.Vector3();
        const color = new THREE.Color( 0xFFFFFF );

        positions.forEach((_, i) => {
            vertex.x = (Math.random() * 2 - 1) * radius;
            vertex.y = (Math.random() * 2 - 1) * radius;
            vertex.z = (Math.random() * 2 - 1) * radius;
            (vertex as any).toArray(positions, i);

            // set alpha randomly
            alphas[i] = Math.random();

            sizes[i] = 2 * Math.random() + 0.5;

            color.setHSL(0.15 * ( i / amount ) - 0.005, 0.8, 0.6);
            (color as any).toArray(colors, i * 3);
        });

        const geometry = new THREE.BufferGeometry();
        geometry.addAttribute( 'alpha', new THREE.BufferAttribute( alphas, 1 ) );
        geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
        geometry.addAttribute( 'customColor', new THREE.BufferAttribute( colors, 3 ) );
        geometry.addAttribute( 'size', new THREE.BufferAttribute( sizes, 1 ) );

        const material = new THREE.ShaderMaterial( {
            uniforms: {
                amplitude: { value: 1.0 },
                color:     { value: new THREE.Color( 0xffffff ) },
                texture:   { value: new THREE.TextureLoader().load( this.particleImagePath ) },
                opacity: 0.5
            },
            vertexShader:   VERTEX_SHADER,
            fragmentShader: FRAGMENT_SHADER,
            blending:       THREE.AdditiveBlending,
            depthTest:      false,
            transparent:    true
        } );

        const cluster = new THREE.Points( geometry, material );

        cluster.position.y = STICK.height * 0.5 + WICK.height * 0.5;

        cluster["life"] = 0;

        this.flame.add(cluster);
    }

    burn() {
        this.addCluster();

        this.flame.children.forEach((spark, i) => {
            // spark.position.x += Math.cos(spark["life"]);
            const alphas = spark.geometry.attributes.alpha;
            alphas.needsUpdate = true; // important!

            const count = alphas.count;
            for ( let i = 0; i < count; i ++ ) {
                alphas.array[ i ] = spark["life"] / MAX_FLAME_LIFE;
            }
            spark.position.y += spark["life"] - GRAVITY;
            // spark.position.z += Math.cos(spark["life"]);

            if (spark["life"] > MAX_FLAME_LIFE * this.flameSize) {
                this.flame.children.splice(i, 1);
            }
            spark["life"] += DEATH_RATE * this.flameSize;
        });
    }

    init() {
        this.createStick();
        this.createWick();
        this.createGlow();
    }

    move(prop, inc) {
        this.main.position[prop] = inc;
    }

    animate() {
        // this.main.rotation.x += 0.01;
        // this.main.rotation.z += 0.01;
        this.burn();
    }

    render(index: number) {
        this.init();
        this.main.name = `candle-${index}`;
        this.flame.name = "flame";
        this.candle.name = "candle";
        this.main.add(this.flame);
        this.main.add(this.candle);
        return this.main;
    }

}
