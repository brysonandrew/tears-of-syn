import THREE = require('three');

export const loadGround = () => {
    return new Promise((resolve) => {
        // texture["wrapS"] = texture["wrapT"] = THREE.RepeatWrapping;
        // texture["anisotropy"] = 16;
        // texture["repeat"].set(4, 4);
        const geometry = new THREE.PlaneGeometry( 500, 500, 1 );
        const material = new THREE.MeshPhongMaterial( {emissive: 0x000000} );
        const mesh = new THREE.Mesh( geometry, material );
        mesh.position.y = -2.5;
        mesh.rotation.x = Math.PI * 1.5;
        resolve(mesh);
    });
};
