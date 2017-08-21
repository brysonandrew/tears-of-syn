import THREE = require('three');
import { loadTexture } from "../../../../../../../../data/helpers/loaders/texture";

export const loadBackground = () => {
    return new Promise(resolve => {
        loadTexture("/images/textures/whiteblack.jpg").then((texture) => {
            texture["mapping"] = THREE.UVMapping;
            // texture["wrapS"] = texture["wrapT"] = THREE.RepeatWrapping;
            // texture["repeat"].set(1000, 1000);

            const mesh = new THREE.Mesh(
                new THREE.SphereBufferGeometry( 1200, 32, 16 ),
                new THREE.MeshBasicMaterial( { map: texture } )
            );

            mesh.scale.y = -1;
            mesh.position.y += 200;
            resolve(mesh);
        });
    });
};
