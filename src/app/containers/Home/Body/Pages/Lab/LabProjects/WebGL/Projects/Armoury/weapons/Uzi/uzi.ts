import THREE = require('three');
import { createGun } from './gunParts';

export class Uzi {

    gun = new THREE.Group;
    initialY = 9;
    initialZ = -4;

    assemble() {
        this.gun.add(createGun());
        this.gun.scale.set(0.2, 0.2, 0.2);
        this.gun.position.set(0, this.initialY, this.initialZ);
    }

    render() {
        return this.gun;
    }
}
