"use strict";
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
var Ability = /** @class */ (function () {
    function Ability(name, owner) {
        this.name = name;
        this.owner = owner;
        this.powerup = Ability.Powerup.NONE;
    }
    Ability.prototype.effect = function (state) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (state.type === "attack") {
                    if (state.attacker === this.owner) {
                        if (this.powerup === Ability.Powerup.DOUBLE_DAMAGE) {
                            state.damageModifiers.push(2);
                        }
                        else if (this.powerup === Ability.Powerup.HALF_DAMAGE) {
                            state.damageModifiers.push(0.5);
                        }
                    }
                }
                else if (state.type === "switch") {
                    if (state.switcher === this.owner) {
                        if (this.powerup === Ability.Powerup.CANNOT_SWITCH) {
                            state.allowed = false;
                        }
                    }
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
})(Ability || (Ability = {}));
var Creature = /** @class */ (function () {
    function Creature(name, hp) {
        if (hp === void 0) { hp = 100; }
        this.name = name;
        this.hp = hp;
        this.ability = new Ability("huge power", this);
    }
    Creature.prototype.effect = function (state) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (state.type === "attack" && state.defender === this && this.name === "rowlet")
                    state.nullified = true;
                return [2 /*return*/, state];
            });
        });
    };
    Creature.prototype.useAttack = function (attack, defender) {
        return __awaiter(this, void 0, void 0, function () {
            var state, effectFunctionHolders, effectFunctions, _i, effectFunctions_1, fn, multiplier;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        state = { type: 'attack', attacker: this, attack: attack, defender: defender, damageModifiers: [], nullified: false };
                        effectFunctionHolders = [this, attack, defender, this.ability,];
                        effectFunctions = effectFunctionHolders.map(function (efh) { return efh.effect.bind(efh); });
                        _i = 0, effectFunctions_1 = effectFunctions;
                        _a.label = 1;
                    case 1:
                        if (!(_i < effectFunctions_1.length)) return [3 /*break*/, 4];
                        fn = effectFunctions_1[_i];
                        return [4 /*yield*/, fn(state)];
                    case 2:
                        state = _a.sent();
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        multiplier = state.damageModifiers.reduce(function (acc, curr) { return acc * curr; }, 1);
                        if (!state.nullified)
                            defender.hp -= attack.damage * multiplier;
                        return [2 /*return*/];
                }
            });
        });
    };
    Creature.prototype.switchOut = function () {
        return __awaiter(this, void 0, void 0, function () {
            var state, effectFunctionHolders, effectFunctions, _i, effectFunctions_2, fn;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        state = { type: 'switch', switcher: this, replacement: this, allowed: true };
                        effectFunctionHolders = [this, this.ability];
                        effectFunctions = effectFunctionHolders.map(function (efh) { return efh.effect.bind(efh); });
                        _i = 0, effectFunctions_2 = effectFunctions;
                        _a.label = 1;
                    case 1:
                        if (!(_i < effectFunctions_2.length)) return [3 /*break*/, 4];
                        fn = effectFunctions_2[_i];
                        return [4 /*yield*/, fn(state)];
                    case 2:
                        state = _a.sent();
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        if (state.allowed)
                            console.log(this.name + " switched out!");
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
                return [2 /*return*/, state];
            });
        });
    };
    return Attack;
}());
var rowlet = new Creature('rowlet');
rowlet.ability.powerup = Ability.Powerup.CANNOT_SWITCH;
var popplio = new Creature('popplio');
var leafage = new Attack('leafage', 40);
(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, popplio.useAttack(leafage, rowlet)];
            case 1:
                _a.sent();
                return [4 /*yield*/, rowlet.switchOut()];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })();
console.log(rowlet.hp);
