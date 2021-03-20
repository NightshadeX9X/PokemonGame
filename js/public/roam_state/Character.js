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
import Direction from "../util/Direction.js";
import Events from "../util/Events.js";
import Spritesheet from "../util/Spritesheet.js";
import Vector from "../util/Vector.js";
import DelayState from '../states/DelayState.js';
import State from "../core/State.js";
var Character = /** @class */ (function () {
    function Character(roamState, imageName) {
        this.roamState = roamState;
        this.imageName = imageName;
        this.walking = false;
        this.canWalk = true;
        this.evtHandler = new Events.Handler();
        this.image = null;
        this.spritesheet = null;
        this.pos = new Vector();
        this.direction = Direction.DOWN;
    }
    Character.prototype.setDirection = function (d) {
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
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log(this);
                        _a = this;
                        return [4 /*yield*/, loader.loadImage("/assets/images/characters/" + this.imageName + ".png")];
                    case 1:
                        _a.image = _b.sent();
                        this.spritesheet = new Spritesheet(this.image);
                        return [2 /*return*/];
                }
            });
        });
    };
    Character.prototype.render = function (ctx) {
        this.spritesheet.render(ctx, this.pos.diff(0, 1).prod(this.roamState.tileSize));
    };
    Character.prototype.takeStep = function (direction, container) {
        return __awaiter(this, void 0, void 0, function () {
            var vec, i;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        vec = Direction.toVector(direction).quo(16);
                        this.spritesheet.coords.x++;
                        if (this.spritesheet.coords.x > 3)
                            this.spritesheet.coords.x = 0;
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < 4)) return [3 /*break*/, 5];
                        return [4 /*yield*/, State.runFuncAsState(container.subStateStack, function () { return _this.pos.add(vec); })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, DelayState.create(container.subStateStack, 1)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
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
            var container, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.canWalk || this.walking)
                            return [2 /*return*/];
                        this.walking = true;
                        this.setDirection(direction);
                        container = new State(this.roamState.backgroundProcesses);
                        return [4 /*yield*/, this.roamState.backgroundProcesses.push(container)];
                    case 1:
                        _a.sent();
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < 4)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.takeStep(direction, container)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5:
                        container.remove();
                        this.walking = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    return Character;
}());
export default Character;
