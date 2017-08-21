export const linearize = (n, origin, target) => {
    return origin * (n / 100)  + (target - target * n / 100);
};
