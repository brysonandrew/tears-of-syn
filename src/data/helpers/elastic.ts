//
// VARIABLES
//

let spring = .4;
let friction = .8;
let easing = .1;
let vy = 0;
let sy = 100;
let dy = 200;

export const elastic = (released) => {

    if (released) {

        vy = vy + (dy - sy) * spring;
        sy = sy +  (vy *= friction);

    } else {

        sy = sy + (dy - sy) * easing;

    }

    return sy;

};
