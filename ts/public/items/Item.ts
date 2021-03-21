import Loader from '../core/Loader.js';
import UIDGen from '../util/UIDGen.js';
import Bag from './Bag.js';

class Item {
	public isNew = true;
	private static idGen = new UIDGen("ITEM");
	public id = Item.idGen.generate();
	public type: Item.Type;

	constructor(type: Item.Type | keyof typeof Item.Types) {
		this.type = typeof type === "string" ? Item.Types[type] : type;
	}

	public static async loadAll(loader: Loader) {
		Item.Types = {} as any;
		const itemFiles = await loader.loadJSON(`/items`) as string[];

		await Promise.all(itemFiles.map(async itemFile => {
			const type = await loader.loadJSDefault<Item.Type>(`/js/items/definitions/${itemFile}`);
			(Item.Types as any)[type.itemName] = type;
		}));
	}
}

namespace Item {
	export class Type {
		constructor(public itemName: string, public pocket: Bag.Pocket.Type, public price = 0) { }
	}

	export namespace Types {
		export declare const potion: Item.Type;
		export declare const ether: Item.Type;
	}
}

export default Item;