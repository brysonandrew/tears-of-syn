import THREE = require('three');
import { createCar } from './carParts';

export class Sedan {

    car = new THREE.Group;
    initialY = 9;
    initialZ = -4;

    assemble() {
        createCar().then((car) => this.car.add(car));
        this.car.scale.set(0.6, 0.6, 0.6);
        this.car.position.set(0, this.initialY, this.initialZ);
    }

    render() {
        return this.car;
    }
}
