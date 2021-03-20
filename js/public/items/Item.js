var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ChildOf } from "../util/functions.js";
var Item = /** @class */ (function () {
    function Item() {
        this.isNew = true;
    }
    return Item;
}());
(function (Item) {
    Item.Type = /** @class */ (function () {
        function class_1(_props) {
            var props = Object.assign({
                itemName: "",
                price: 0,
                displayName: "",
                graphicName: "",
            }, _props);
            var ItemType = /** @class */ (function () {
                function ItemType() {
                    Item.call(this);
                }
                ItemType_1 = ItemType;
                Object.defineProperty(ItemType.prototype, "Type", {
                    get: function () { return this.constructor; },
                    enumerable: false,
                    configurable: true
                });
                Object.defineProperty(ItemType.prototype, "itemName", {
                    get: function () { return this.Type.itemName; },
                    enumerable: false,
                    configurable: true
                });
                Object.defineProperty(ItemType.prototype, "displayName", {
                    get: function () { return this.Type.displayName; },
                    enumerable: false,
                    configurable: true
                });
                Object.defineProperty(ItemType.prototype, "price", {
                    get: function () { return this.Type.price; },
                    enumerable: false,
                    configurable: true
                });
                Object.defineProperty(ItemType.prototype, "graphicName", {
                    get: function () { return this.Type.graphicName; },
                    enumerable: false,
                    configurable: true
                });
                var ItemType_1;
                ItemType.itemName = props.itemName;
                ItemType.displayName = props.displayName;
                ItemType.price = props.price;
                ItemType.graphicName = props.graphicName;
                ItemType = ItemType_1 = __decorate([
                    ChildOf(Item)
                ], ItemType);
                return ItemType;
            }());
            return ItemType;
        }
        return class_1;
    }());
    var Types;
    (function (Types) {
    })(Types = Item.Types || (Item.Types = {}));
})(Item || (Item = {}));
new Item.Types.potion();
export default Item;
