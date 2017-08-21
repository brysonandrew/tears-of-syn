import THREE = require('three');
const carObjects = new THREE.Group;
const carBase__width = 16;
const carBase__height = 4;
const carMaterialOptions = {
    color: 0x000000
};

const createCarBase = () => {
    return new Promise(resolve => {

        const carBase__length = 40;

        const carBase__geometry = new THREE.BoxGeometry( carBase__width, carBase__height, carBase__length );
        const carBase__material = new THREE.MeshBasicMaterial( carMaterialOptions );
        const carBase__mesh = new THREE.Mesh( carBase__geometry, carBase__material );
        carBase__mesh.position.set(0, 0 , 0);
        resolve(carBase__mesh);
    });

};

const createCarTop = () => {
    return new Promise(resolve => {

        const carTop__height = 4;
        const carTop__width = 16;
        const carTop__length = 20;

        const carTop__geometry = new THREE.BoxGeometry( carTop__width, carTop__height, carTop__length );
        const carTop__material = new THREE.MeshBasicMaterial( carMaterialOptions );
        const carTop__mesh = new THREE.Mesh( carTop__geometry, carTop__material );
        carTop__mesh.position.set(0, carBase__height , 0);
        resolve(carTop__mesh);

    });
};

const createCarWheels = () => {
    return new Promise(resolve => {

        const carWheels = new THREE.Group;

        new Array(8).fill("_").map((_, i) => {
            const carWheel__geometry = new THREE.CircleGeometry(2.25, 32);
            const carWheel__material = new THREE.MeshBasicMaterial({color: 0x424242});
            const carWheel__mesh = new THREE.Mesh(carWheel__geometry, carWheel__material);
            const isEven = (i % 2 === 0);
            const isOverHalf = (3 < i);

            carWheel__mesh.position.set(
                isOverHalf ? carBase__width * 0.5 + 0.1 : -carBase__width * 0.5 - 0.1,
                -0.75,
                isEven ? carBase__width * 0.85 : -carBase__width * 0.85);
            carWheel__mesh.rotation.set(
                0,
                isOverHalf ? Math.PI * 0.5 : Math.PI * 1.5,
                0);

            carWheels.add(carWheel__mesh);
        });

        resolve(carWheels);
    });
};

export const createCar = () => {
    carObjects.position.y += 0.5;
    return new Promise(resolve => {
            Promise.all([
            createCarBase(),
            createCarTop(),
            createCarWheels()
        ]).then(meshes => {
            meshes.map(mesh => carObjects.add(mesh));
            resolve(carObjects);
        });
    });
};
