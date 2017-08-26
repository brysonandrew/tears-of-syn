import THREE = require('three');
import { loadTexture } from "../../../../../../../../../../../data/helpers/loaders/texture";

export const loadGround = () => {
    return new Promise((resolve, reject) => {
        loadTexture("/images/spotlight/2077.jpg").then((texture) => {
            const geometry = new THREE.PlaneGeometry( 500, 500, 1 );
            const material = new THREE.MeshPhongMaterial({emissive: 0x000000, map: texture} );
            const mesh = new THREE.Mesh( geometry, material );
            mesh.rotation.x = Math.PI * 1.5;
            resolve(mesh);
        });
    });
};
