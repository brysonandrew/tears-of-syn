import THREE = require('three');
import { createGun } from './gunParts';

export class GatlingGun {

    gun = new THREE.Group;
    bullets = new THREE.Group;
    gunParts;
    gunBarrel;
    warmUp = 0;
    rate = 0;
    count = 0;
    barrelTurnRate = 0;
    gunRotateRate = 0;
    initialY = 10;
    initialZ = 0;

    constructor() {}

    assemble() {
        this.gun.add(createGun());
        this.gun.scale.set(0.2,0.2,0.2);
        this.gun.position.set(0, this.initialY, this.initialZ);
        this.gunParts = this.gun.children[0].children;
        this.gunBarrel = this.gunParts[this.gunParts.length - 1];
    }

    render() {
        return this.gun;
    }
}