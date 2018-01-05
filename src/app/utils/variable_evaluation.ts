export const exists = (x) => Boolean(x);

export const defined = (x) => (typeof x !== 'undefined' && x !== null);

export const isArray = (x) => (x.constructor === Array);
