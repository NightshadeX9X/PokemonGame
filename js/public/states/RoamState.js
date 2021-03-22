var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
import State from "../core/State.js";
import Camera from "../roam_state/Camera.js";
import GameMap from "../roam_state/GameMap.js";
import GameMapLayer from "../roam_state/GameMapLayer.js";
import Player from "../roam_state/Player.js";
import Vector from "../util/Vector.js";
var RoamState = /** @class */ (function (_super) {
    __extends(RoamState, _super);
    function RoamState() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.tileSize = 16;
        _this.player = new Player(_this);
        _this.gameMap = new GameMap(_this, "route5");
        _this.camera = new Camera(_this, new Vector(480, 320));
        return _this;
    }
    RoamState.prototype.preload = function (loader) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all([
                            this.player.preload(loader),
                            this.gameMap.preload(loader),
                        ])];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    RoamState.prototype.update = function (input) {
        this.player.update(input);
        this.camera.update();
        _super.prototype.update.call(this, input);
    };
    RoamState.prototype.getRenderablesSorted = function () {
        function getPriority(renderable) {
            if (renderable instanceof GameMapLayer)
                return 0;
            return 1;
        }
        var renderables = __spreadArrays([this.player], this.gameMap.layers);
        renderables.sort(function (a, b) {
            if (a.zIndex !== b.zIndex)
                return a.zIndex - b.zIndex;
            if (getPriority(a) !== getPriority(b))
                return getPriority(a) - getPriority(b);
            var aPos = a.pos || new Vector;
            var bPos = b.pos || new Vector;
            if (aPos.y !== bPos.y)
                return aPos.y - bPos.y;
            return 0;
        });
        return renderables;
    };
    RoamState.prototype.renderRenderables = function (ctx) {
        var renderables = this.getRenderablesSorted();
        renderables.forEach(function (renderable) {
            renderable.render(ctx);
        });
    };
    RoamState.prototype.render = function (ctx) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        this.renderRenderables(ctx);
        this.camera.render(ctx);
        State.prototype.render.call(this, ctx);
    };
    return RoamState;
}(State));
export default RoamState;
