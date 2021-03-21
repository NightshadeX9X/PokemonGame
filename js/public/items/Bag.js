var Bag = /** @class */ (function () {
    function Bag() {
        this.pockets = [];
        this.money = 0;
        this.initPockets();
    }
    Object.defineProperty(Bag.prototype, "items", {
        get: function () {
            var items = [];
            this.pockets.forEach(function (pocket) { return items.push.apply(items, pocket.items); });
            return items;
        },
        enumerable: false,
        configurable: true
    });
    Bag.prototype.initPockets = function () {
        this.pockets = [];
        for (var _typeName in Bag.Pocket.Type) {
            if (!isNaN(Number(_typeName)))
                continue;
            var typeName = _typeName;
            this.pockets.push(new Bag.Pocket(Bag.Pocket.Type[typeName]));
        }
    };
    Bag.prototype.addItem = function (item) {
        var pocket = this.pockets.find(function (pocket) { return pocket.type === item.type.pocket; });
        pocket === null || pocket === void 0 ? void 0 : pocket.items.push(item);
    };
    Bag.prototype.addMoney = function (amount) {
        this.money += amount;
        if (this.money < 0)
            this.money = 0;
        if (this.money > Bag.maxMoney)
            this.money = Bag.maxMoney;
    };
    Bag.maxMoney = Math.pow(10, 6) - 1;
    return Bag;
}());
(function (Bag) {
    var Pocket = /** @class */ (function () {
        function Pocket(type) {
            this.type = type;
            this.items = [];
        }
        Object.defineProperty(Pocket.prototype, "color", {
            get: function () {
                if (this.type === Pocket.Type.BERRIES)
                    return "green";
                else
                    return "cyan";
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Pocket.prototype, "displayName", {
            get: function () {
                if (this.type === Pocket.Type.BERRIES)
                    return "Berries";
                else
                    return "Medicine";
            },
            enumerable: false,
            configurable: true
        });
        return Pocket;
    }());
    Bag.Pocket = Pocket;
    (function (Pocket) {
        var Type;
        (function (Type) {
            Type[Type["MEDICINE"] = 0] = "MEDICINE";
            Type[Type["BERRIES"] = 1] = "BERRIES";
        })(Type = Pocket.Type || (Pocket.Type = {}));
    })(Pocket = Bag.Pocket || (Bag.Pocket = {}));
})(Bag || (Bag = {}));
export default Bag;
