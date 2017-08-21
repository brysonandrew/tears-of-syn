const keys = {
    forward: "x",
    back: "z",
    fire: "c",
    left: ",",
    right: ".",
    up: "m",
    down: "/"
};

const speeds = {
    walking: 10,
    turningY: Math.PI * 0.125,
    turningX: Math.PI * 0.0125
};

const isKey = (keyList, key) =>  keyList.indexOf(key) > -1;

export const isFiring = (keyList) => {
    return isKey(keyList, keys.fire);
};

export const isMove = {
    forward: (keysPressed) => (isKey(keysPressed, keys.forward)),
    back: (keysPressed) => (isKey(keysPressed, keys.back)),
    left: (keysPressed) => (isKey(keysPressed, keys.left)),
    right: (keysPressed) => (isKey(keysPressed, keys.right)),
    up: (keysPressed) => (isKey(keysPressed, keys.up)),
    down: (keysPressed) => (isKey(keysPressed, keys.down))
};

export const playerPositionX = (keysPressed, playerRotationY) => {
    return isMove.forward(keysPressed)
            ?   Math.sin(playerRotationY) * speeds.walking
            :   isMove.back(keysPressed)
                ?   -Math.sin(playerRotationY) * speeds.walking
                :   0;
};

export const playerPositionZ = (keysPressed, playerRotationY) => {
    return isMove.forward(keysPressed)
            ?   Math.cos(playerRotationY) * speeds.walking
            :   isMove.back(keysPressed)
                ?   -Math.cos(playerRotationY) * speeds.walking
                :   0;
};

export const playerRotationX = (keysPressed) => { // always up and down
    const inc = speeds.turningX;
    return isMove.up(keysPressed)
        ?   inc
        :   isMove.down(keysPressed)
            ?   -inc
            :   0;
};

export const playerRotationY = (keysPressed) => {
    const inc = speeds.turningY;
    return isMove.left(keysPressed)
        ?   inc
        :   isMove.right(keysPressed)
            ?   -inc
            :   0;
};

export const animateKey = (key, keysPressed, fraction) => {
    return isKey(keysPressed, key)  ? fraction : 0;
};
