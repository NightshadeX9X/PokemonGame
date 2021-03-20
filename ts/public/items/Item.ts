import { ChildOf } from "../util/functions.js";

class Item {
	isNew = true;
}

namespace Item {
	interface ItemProps {
		itemName: string;
		displayName: string;
		price: number;
		graphicName: string;
	}
	type SpecificType = Constructor<Item & Readonly<ItemProps>, [], ItemProps>;

	export const Type = class {
		constructor(_props: Partial<ItemProps>) {
			const props = Object.assign({
				itemName: "",
				price: 0,
				displayName: "",
				graphicName: "",
			}, _props) as ItemProps;

			interface ItemType extends Item { }

			@ChildOf(Item)
			class ItemType {
				static itemName = props.itemName;
				static displayName = props.displayName;
				static price = props.price;
				static graphicName = props.graphicName;

				constructor() { Item.call(this) }

				private get Type() { return this.constructor as typeof ItemType; }

				get itemName() { return this.Type.itemName; }
				get displayName() { return this.Type.displayName; }
				get price() { return this.Type.price; }
				get graphicName() { return this.Type.graphicName; }
			}

			return ItemType;
		}
	} as Constructor<SpecificType, [Partial<ItemProps>]>;

	export type Type = InstanceType<typeof Type>;

	export namespace Types {
		export declare const potion: Item.Type;
	}
}
new Item.Types.potion();


export default Item;