export const easeMotion = (isActive, peak, incRate, currRate) => {
    if (isActive) {
        if (currRate < peak) {
            currRate += incRate;
        } else {
            currRate = 0.5;
        }
    } else if (!isActive) {
        if (currRate > 0) {
            currRate -= incRate;
        } else {
            currRate = 0;
        }
    }
    return currRate;
};

export const linearize = (n, origin, target) => {
    return origin * (n / 100)  + (target - target * n / 100);
};

let spring = .4;
let friction = .8;
let easing = .1;
    // vy = 0;
    // sy = 100,
    // dy = 200;

export const elastic = (isActive, dy, sy, vy) => {

    if (!isActive) {

        vy = vy + (dy - sy) * spring;
        sy = sy +  (vy *= friction);

    } else {

        sy = sy + (dy - sy) * easing;

    }

    return sy;

};
