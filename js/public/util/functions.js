var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
export function createChildObject(child, parents) {
    function fromTwoParents(base, a, b) {
        var proxy = new Proxy(base, {
            get: function (target, key) {
                var value = undefined;
                [a, b, target].forEach(function (obj) {
                    if (key in obj) {
                        value = obj[key];
                    }
                });
                return value;
            },
            has: function (target, key) {
                var value = false;
                [a, b, target].forEach(function (obj) {
                    if (key in obj) {
                        value = true;
                    }
                });
                return value;
            }
        });
        return proxy;
    }
    return parents.reduce(function (acc, curr) {
        return fromTwoParents(acc, curr, {});
    }, fromTwoParents(child, {}, {}));
}
export function ChildOf() {
    var parents = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        parents[_i] = arguments[_i];
    }
    return function (ctor) {
        Object.setPrototypeOf(ctor.prototype, createChildObject({}, parents.map(function (p) { return p.prototype; })));
    };
}
export function random(min, max, whole) {
    if (min === void 0) { min = 0; }
    if (max === void 0) { max = 1; }
    if (whole === void 0) { whole = true; }
    return whole ? Math.floor(Math.random() * (max - min + 1) + min) : Math.random() * (max - min) + min;
}
export function chance(x, outOfY) {
    if (x === void 0) { x = 1; }
    if (outOfY === void 0) { outOfY = 100; }
    if (x >= outOfY)
        return true;
    var num = random(1, outOfY, true);
    return num <= x;
}
export function insertIntoArray(array, index, values) {
    return __spreadArrays(array.slice(0, index), values, array.slice(index));
}
export function createCanvas(size) {
    var cnv = document.createElement('canvas');
    var ctx = cnv.getContext('2d');
    cnv.width = size.x;
    cnv.height = size.y;
    return { cnv: cnv, ctx: ctx };
}
