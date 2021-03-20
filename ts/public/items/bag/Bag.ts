import Item from "../Item.js";

class Bag {
	public pockets: Bag.Pocket[] = [];

	constructor() {
		this.initPockets();
	}

	public get items() {
		const items: Item[] = [];
		this.pockets.forEach(pocket => items.push(...pocket.items))
		return items;
	}

	private initPockets() {
		this.pockets = [];

		for (const _typeName in Bag.Pocket.Type) {
			if (!isNaN(Number(_typeName))) continue;

			const typeName = _typeName as keyof typeof Bag.Pocket.Type;
			this.pockets.push(new Bag.Pocket(Bag.Pocket.Type[typeName]))
		}
	}

	addItem(item: Item) {
		const pocket = this.pockets.find(pocket => pocket.type === item.type.pocket);
		pocket?.items.push(item);
	}
}

namespace Bag {
	export class Pocket {
		public items: Item[] = [];

		constructor(public type: Pocket.Type) {

		}

		public get displayName() {
			if (this.type === Pocket.Type.BERRIES) return "Berries";
			else return "Medicine";
		}
	}
	export namespace Pocket {
		export enum Type {
			MEDICINE,
			BERRIES
		}
	}
}

export default Bag;