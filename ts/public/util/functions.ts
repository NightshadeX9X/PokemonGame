import Vector from "./Vector.js";

export function createChildObject<Child extends Record<keyof any, any>, Parent extends Record<keyof any, any>>(child: Child, parents: Parent[]) {
	function fromTwoParents<Base extends Record<keyof any, any>, A extends Record<keyof any, any>, B extends Record<keyof any, any>>(base: Base, a: A, b: B) {
		const proxy = new Proxy(base, {
			get(target, key) {
				let value: any = undefined;
				[a, b, target].forEach(obj => {
					if (key in obj) {
						value = (obj as any)[key];
					}
				});
				return value;
			},
			has(target, key) {
				let value = false;
				[a, b, target].forEach(obj => {
					if (key in obj) {
						value = true;
					}
				});
				return value;
			}
		});

		return proxy as A & B;
	}
	return parents.reduce((acc, curr) => {
		return fromTwoParents(acc, curr, {})
	}, fromTwoParents(child, {}, {})) as UnionToIntersection<Parent> & Child;
}

export function ChildOf(...parents: Constructor[]) {
	return function (ctor: Constructor) {
		Object.setPrototypeOf(ctor.prototype, createChildObject({}, parents.map(p => p.prototype)));
	}
}


export function random(min = 0, max = 1, whole = true) {
	return whole ? Math.floor(Math.random() * (max - min + 1) + min) : Math.random() * (max - min) + min;
}

export function chance(x = 1, outOfY = 100) {
	if (x >= outOfY) return true;
	const num = random(1, outOfY, true);
	return num <= x;
}

export function insertIntoArray<T>(array: T[], index: number, values: T[]) {
	return [...array.slice(0, index), ...values, ...array.slice(index)]
}

export function createCanvas(size: Vector) {
	const cnv = document.createElement('canvas');
	const ctx = cnv.getContext('2d') as CanvasRenderingContext2D;
	cnv.width = size.x;
	cnv.height = size.y;
	return { cnv, ctx }
}