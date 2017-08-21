import THREE = require('three');

export const loadTexture = ( url ) => {
    return new Promise((resolve) => {
        const loader = new THREE.TextureLoader();
        loader.load( url, ( texture ) => resolve(texture) );
    });
};
