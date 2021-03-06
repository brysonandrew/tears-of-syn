import * as THREE from "three";

const CONFIGS = {
    width: 1000,
    height: 500,
    z: -5,
    color: 0x1A237E
};

export class Wall {

    wall;

    init() {
        const geometry = new THREE.PlaneGeometry( CONFIGS.width, CONFIGS.height );
        const material = new THREE.MeshPhongMaterial( { emissive: CONFIGS.color, side: THREE.DoubleSide } );
        this.wall = new THREE.Mesh( geometry, material );
        this.wall.position.z = CONFIGS.z;
    }

    render() {
        this.wall.name = "wall";
        return this.wall;
    }
}
