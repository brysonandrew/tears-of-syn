import THREE = require('three');

const colors = {
    black: 0x000000,
    darkgrey: 0x212121,
    lightgrey: 0x757575
};

export const createSingleBarrel = () => {
    const geometry = new THREE.CylinderGeometry( 2, 2, 10, 10 );
    const material = new THREE.MeshPhongMaterial( {
        emissive: colors.darkgrey
    } );
    return new THREE.Mesh( geometry, material );
};

export const createBody = () => {
    const geometry = new THREE.BoxGeometry( 4, 12, 40 );
    const material = new THREE.MeshPhongMaterial( {
        emissive: colors.black,
    } );
    return new THREE.Mesh( geometry, material );
};

export const createHandle = () => {
    const geometry = new THREE.BoxGeometry( 4, 40, 12 );
    const material = new THREE.MeshPhongMaterial( {
        emissive: colors.black,
    } );
    return new THREE.Mesh( geometry, material );
};

export const createGun = () => {
    const gun = new THREE.Group;

    const barrel = createSingleBarrel();
    barrel.rotation.set(Math.PI * 0.5, 0, 0);
    barrel.position.set(0, 0, 20);
    gun.add( barrel );

    const body = createBody();
    gun.add( body );

    const handle = createHandle();
    handle.position.set(0, -20, 0);
    gun.add( handle );

    return gun;
};
