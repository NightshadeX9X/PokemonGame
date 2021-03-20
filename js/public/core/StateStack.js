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
import Events from "../util/Events.js";
import { insertIntoArray } from "../util/functions.js";
var StateStack = /** @class */ (function () {
    function StateStack(parent, game) {
        this.parent = parent;
        this.game = game;
        this.states = [];
        this.evtHandler = new Events.Handler();
    }
    StateStack.prototype.insert = function (state, index) {
        if (index === void 0) { index = 0; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.states = insertIntoArray(this.states, index, [state]);
                        return [4 /*yield*/, state.preload(this.game.loader)];
                    case 1:
                        _a.sent();
                        this.evtHandler.dispatchEvent('insert state', state, index);
                        state.evtHandler.dispatchEvent('insert', this, index);
                        return [2 /*return*/];
                }
            });
        });
    };
    StateStack.prototype.push = function (state) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.insert(state, this.states.length)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    StateStack.prototype.remove = function (index) {
        if (index < 0)
            return;
        var state = this.states[index];
        this.states.splice(index, 1);
        this.evtHandler.dispatchEvent('remove state', state, index);
        state === null || state === void 0 ? void 0 : state.evtHandler.dispatchEvent('remove', this, index);
    };
    StateStack.prototype.pop = function () {
        this.remove(this.states.length - 1);
    };
    StateStack.prototype.replace = function (state, index) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.remove(index);
                        return [4 /*yield*/, this.insert(state, index)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    StateStack.prototype.fromTop = function (n, ignoreNonBlocking) {
        if (n === void 0) { n = 0; }
        if (ignoreNonBlocking === void 0) { ignoreNonBlocking = false; }
        var states = ignoreNonBlocking ? this.states.filter(function (s) { return s.blocking; }) : this.states;
        return states[this.states.length - 1 - n];
    };
    StateStack.prototype.fromBottom = function (n, ignoreNonBlocking) {
        if (n === void 0) { n = 0; }
        if (ignoreNonBlocking === void 0) { ignoreNonBlocking = false; }
        var states = ignoreNonBlocking ? this.states.filter(function (s) { return s.blocking; }) : this.states;
        return states[n];
    };
    StateStack.prototype.defaultToRenderState = function (s) { return this.states.includes(s); };
    StateStack.prototype.defaultToUpdateState = function (s) {
        return this.fromTop(0, true) === s;
    };
    StateStack.prototype.toRenderState = function (s) {
        if (s.toRender !== null)
            return s.toRender;
        return this.defaultToRenderState(s);
    };
    StateStack.prototype.toUpdateState = function (s) {
        if (s.toUpdate !== null)
            return s.toUpdate;
        return this.defaultToUpdateState(s);
    };
    StateStack.prototype.update = function (input) {
        var _this = this;
        this.states.filter(function (s) { return _this.toUpdateState(s); }).forEach(function (s) {
            s.update(input);
        });
    };
    StateStack.prototype.render = function (ctx) {
        var _this = this;
        this.states.filter(function (s) { return _this.toRenderState(s); }).forEach(function (s) {
            s.render(ctx);
        });
    };
    return StateStack;
}());
export default StateStack;
