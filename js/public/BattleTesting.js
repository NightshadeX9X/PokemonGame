var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
export default function callRelatedEffectFns(_state, related) {
    return __awaiter(this, void 0, void 0, function () {
        var state, _i, related_1, r;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    state = _state;
                    _i = 0, related_1 = related;
                    _a.label = 1;
                case 1:
                    if (!(_i < related_1.length)) return [3 /*break*/, 4];
                    r = related_1[_i];
                    return [4 /*yield*/, r.effect(state)];
                case 2:
                    state = _a.sent();
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, state];
            }
        });
    });
}
var Ability = /** @class */ (function () {
    function Ability(name, powerup) {
        if (powerup === void 0) { powerup = Ability.Powerup.NONE; }
        this.name = name;
        this.powerup = powerup;
    }
    Ability.prototype.effect = function (state) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (state.type === "attack") {
                    if (this.powerup === Ability.Powerup.DOUBLE_DAMAGE)
                        state.damage *= 2;
                    if (this.powerup === Ability.Powerup.HALF_DAMAGE)
                        state.damage *= 0.5;
                }
                return [2 /*return*/, state];
            });
        });
    };
    return Ability;
}());
(function (Ability) {
    var Powerup;
    (function (Powerup) {
        Powerup[Powerup["DOUBLE_DAMAGE"] = 0] = "DOUBLE_DAMAGE";
        Powerup[Powerup["HALF_DAMAGE"] = 1] = "HALF_DAMAGE";
        Powerup[Powerup["CANNOT_SWITCH"] = 2] = "CANNOT_SWITCH";
        Powerup[Powerup["NONE"] = 3] = "NONE";
    })(Powerup = Ability.Powerup || (Ability.Powerup = {}));
    var Types;
    (function (Types) {
        Types.HUGE_POWER = new Ability('huge power', Ability.Powerup.DOUBLE_DAMAGE);
        Types.NONE = new Ability('none', Ability.Powerup.NONE);
    })(Types = Ability.Types || (Ability.Types = {}));
})(Ability || (Ability = {}));
var Creature = /** @class */ (function () {
    function Creature(name, hp) {
        if (hp === void 0) { hp = 100; }
        this.name = name;
        this.hp = hp;
    }
    Creature.prototype.effect = function (state) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, callRelatedEffectFns(state, [state.attack, this.ability, state.defender])];
                    case 1:
                        state = _a.sent();
                        return [2 /*return*/, state];
                }
            });
        });
    };
    Creature.prototype.useAttack = function (attack, defender) {
        return __awaiter(this, void 0, void 0, function () {
            var state;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        state = {
                            type: 'attack',
                            attack: attack,
                            attacker: this,
                            defender: defender,
                            damage: 0,
                            nullified: false,
                        };
                        return [4 /*yield*/, this.effect(state)];
                    case 1:
                        state = _a.sent();
                        console.log("Damage:", state.damage);
                        console.log("Nullified:", state.nullified);
                        return [2 /*return*/];
                }
            });
        });
    };
    return Creature;
}());
var Attack = /** @class */ (function () {
    function Attack(name, damage) {
        if (damage === void 0) { damage = 0; }
        this.name = name;
        this.damage = damage;
    }
    Attack.prototype.effect = function (state) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (state.type === "attack") {
                    state.damage = this.damage;
                }
                return [2 /*return*/, state];
            });
        });
    };
    return Attack;
}());
var leafage = new Attack('leafage', 40);
var rowlet = new Creature('rowlet');
rowlet.ability = Ability.Types.HUGE_POWER;
var popplio = new Creature('rowlet');
popplio.ability = Ability.Types.NONE;
rowlet.useAttack(leafage, popplio).then(function () {
    console.log(popplio.hp);
});
