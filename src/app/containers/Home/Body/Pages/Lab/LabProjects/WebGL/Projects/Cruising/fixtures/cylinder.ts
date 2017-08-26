import THREE = require('three');
import { loadTexture } from "../../../../../../../../../../../data/helpers/loaders/texture";

export const loadCylinder = () => {
    return new Promise((resolve) => {
        loadTexture("/images/asphalt.jpg").then((texture) => {
            const geometry = new THREE.CylinderGeometry( 2, 2, 5, 32 );
            const material = new THREE.MeshBasicMaterial({map: texture} );
            const mesh = new THREE.Mesh( geometry, material );
            resolve(mesh);
        });
    });

};
