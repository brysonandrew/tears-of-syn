export function createArray(length: number): null[] {
    return Array.apply(null, new Array(length));
}

export function createArrayOf(item: any, length: number): null[] {
    return Array.apply(null, new Array(length)).map(_ => _ = item);
}

export function setInArray(arr, index, val) {
    return Object.assign([...arr], {[index]: val});
}

export function sortByName(a, b) {
    if (typeof a.name === 'number') {
        return a.name - (b.name as any);
    } else {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    }
}

export function sortBy(prop, a, b) {
    if (typeof a[prop] === 'number') {
        return a[prop] - (b[prop] as any);
    } else {
        if (a[prop] < b[prop]) {
            return -1;
        }
        if (a[prop] > b[prop]) {
            return 1;
        }
        return 0;
    }
}
