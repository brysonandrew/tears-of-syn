import THREE = require('three');

export const textureLoader = ( url ) => {
    return new Promise((resolve) => {
        const loader = new THREE.TextureLoader();
        loader.load( url, ( texture ) => resolve(texture) );
    });
};

export const objectLoader = ( path ) => {
    return new Promise((resolve) => {
            const loader = new THREE.ObjectLoader();
            loader.load( path, ( obj ) => resolve(obj) );
        });
};
