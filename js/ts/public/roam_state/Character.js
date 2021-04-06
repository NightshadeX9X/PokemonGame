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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var _a;
import Direction from "../util/Direction.js";
import Events from "../util/Events.js";
import Spritesheet from "../util/Spritesheet.js";
import Vector from "../util/Vector.js";
import DelayState from '../states/DelayState.js';
import State from "../core/State.js";
var SIGNATURE = Symbol('Character signature');
var Character = /** @class */ (function () {
    function Character(roamState, imageName) {
        this.roamState = roamState;
        this.imageName = imageName;
        this.walking = false;
        this.canWalk = true;
        this.canTurn = true;
        this.canWalkOutOfBounds = false;
        this.canWalkThroughWalls = false;
        this.evtHandler = new Events.Handler();
        this.image = null;
        this.spritesheet = null;
        this.zIndex = 1;
        this.pos = new Vector();
        this.walkingToward = Vector.from(this.pos);
        this[_a] = true;
        this.direction = Direction.DOWN;
    }
    Character.prototype.freeze = function () { this.canWalk = false; this.canTurn = false; };
    Character.prototype.unfreeze = function () { this.canWalk = true; this.canTurn = true; };
    Character.isCharacter = function (c) {
        return c[SIGNATURE] === true;
    };
    Character.prototype.setDirection = function (d) {
        if (!this.canTurn)
            return;
        this.direction = d;
        this.updateSpritesheetFromDirection(d);
    };
    Character.prototype.updateSpritesheetFromDirection = function (direction) {
        if (direction === void 0) { direction = this.direction; }
        if (direction === Direction.DOWN)
            this.spritesheet.coords.y = 0;
        if (direction === Direction.LEFT)
            this.spritesheet.coords.y = 1;
        if (direction === Direction.RIGHT)
            this.spritesheet.coords.y = 2;
        if (direction === Direction.UP)
            this.spritesheet.coords.y = 3;
    };
    Character.prototype.preload = function (loader) {
        return __awaiter(this, void 0, void 0, function () {
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        console.log(this);
                        _b = this;
                        return [4 /*yield*/, loader.loadImage("/assets/images/characters/" + this.imageName + ".png")];
                    case 1:
                        _b.image = _c.sent();
                        this.spritesheet = new Spritesheet(this.image);
                        return [2 /*return*/];
                }
            });
        });
    };
    Character.prototype.render = function (ctx) {
        if (!this.image || !this.spritesheet)
            return;
        var pos = this.roamState.camera.convertCoords(this.pos.diff(0, 1).prod(this.roamState.tileSize));
        this.spritesheet.render(this.roamState.camera.ctx, pos);
    };
    Character.prototype.takeStep = function (direction, container) {
        return __awaiter(this, void 0, void 0, function () {
            var vec, i;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        vec = Direction.toVector(direction).quo(16);
                        this.spritesheet.coords.x++;
                        if (this.spritesheet.coords.x > 3)
                            this.spritesheet.coords.x = 0;
                        i = 0;
                        _b.label = 1;
                    case 1:
                        if (!(i < 4)) return [3 /*break*/, 5];
                        return [4 /*yield*/, State.runFuncAsState(container.subStateStack, function () { return _this.pos.add(vec); })];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, DelayState.create(container.subStateStack, 1)];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 1];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Character.prototype.walk = function (direction) {
        return __awaiter(this, void 0, void 0, function () {
            var destination, oldPos, container, i;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.walking) {
                            this.setDirection(direction);
                        }
                        if (!this.checkWalkingCapability(direction, this.pos))
                            return [2 /*return*/];
                        destination = this.pos.sum(Direction.toVector(direction));
                        oldPos = Vector.from(this.pos);
                        this.walking = true;
                        this.walkingToward.set(destination);
                        container = new State(this.roamState.backgroundProcesses);
                        return [4 /*yield*/, this.roamState.backgroundProcesses.push(container)];
                    case 1:
                        _b.sent();
                        i = 0;
                        _b.label = 2;
                    case 2:
                        if (!(i < 4)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.takeStep(direction, container)];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5:
                        container.remove();
                        this.walking = false;
                        this.evtHandler.dispatchEvent('walk', oldPos, destination, direction);
                        return [2 /*return*/];
                }
            });
        });
    };
    Character.prototype.checkWalkingCapability = function (direction, currentPos) {
        var _this = this;
        var toPos = currentPos.sum(Direction.toVector(direction));
        var mapSize = this.roamState.gameMap.getSizeInTiles();
        if (!this.canWalk || this.walking)
            return false;
        if (this.roamState.stateStack.game.isCheatMode())
            return true;
        if (!this.canWalkOutOfBounds) {
            if (toPos.x < 0 || toPos.y < 0 || toPos.x >= mapSize.x || toPos.y >= mapSize.y)
                return false;
        }
        if (!this.canWalkThroughWalls) {
            var layer = this.getGameMapLayer();
            var parts = layer.partsAt(toPos);
            if (parts.find(function (p) {
                if (p.type !== "wall")
                    return false;
                if (typeof p.value === "boolean")
                    return p.value;
                var str = p.value.toUpperCase();
                var chars = str.split("");
                return chars.includes(Direction.toString(Direction.invert(direction))[0]);
            }))
                return false;
        }
        {
            var allCharactersButThis = this.allInRoamState().filter(function (c) { return c !== _this; });
            for (var _i = 0, allCharactersButThis_1 = allCharactersButThis; _i < allCharactersButThis_1.length; _i++) {
                var c = allCharactersButThis_1[_i];
                var coveredByC = [c.pos, c.walkingToward];
                if (coveredByC.some(function (v) { return v.equals(toPos); }))
                    return false;
            }
        }
        {
            if (this.roamState.gameObjects.some(function (go) { return go.getBlockingSquares().find(function (d) { return d.squares.find(function (v) { return v.equals(toPos); }) && d.zIndex === _this.zIndex; }); }))
                return false;
        }
        return true;
    };
    Character.prototype.getGameMapLayer = function () {
        var _this = this;
        return this.roamState.gameMap.layers.find(function (l) { return l.zIndex === _this.zIndex - 1; });
    };
    Character.prototype.allInRoamState = function () {
        var things = __spreadArrays([this.roamState.player], this.roamState.gameObjects);
        var characters = things.filter(function (x) { return Character.isCharacter(x); });
        return characters;
    };
    Character.prototype.setPos = function (pos) {
        this.pos.set(pos);
        this.walkingToward.set(pos);
    };
    return Character;
}());
_a = SIGNATURE;
export default Character;
