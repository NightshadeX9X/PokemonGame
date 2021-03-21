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
import State from "../core/State.js";
import GameMap from "../roam_state/GameMap.js";
import Player from "../roam_state/Player.js";
var RoamState = /** @class */ (function (_super) {
    __extends(RoamState, _super);
    function RoamState() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.tileSize = 16;
        _this.player = new Player(_this);
        _this.gameMap = new GameMap(_this, "route5");
        _this.colorToneMaxAlpha = 0.4;
        /** The color tone overlay displayed on top of the Camera display. The color varies depending on the hour
         * This list provides all the color tones using an array, from hour 0 (00:00) to hour 23 (23:00)
         * The current time is rounded to the nearest hour, and that index of the this array is the color tone to draw.
         * Color tones should only be rendered in outdoor maps.
         * Format: [Red, Green, Blue, Alpha]
        */
        _this.colorTones = [
            [0, 0, 255, _this.colorToneMaxAlpha],
            [0, 0, 255, _this.colorToneMaxAlpha * 0.8],
            [0, 0, 255, _this.colorToneMaxAlpha * 0.6],
            [0, 0, 255, _this.colorToneMaxAlpha * 0.4],
            [0, 0, 255, _this.colorToneMaxAlpha * 0.2],
            [0, 0, 255, 0],
            [255, 255, 0, 0],
            [255, 255, 0, _this.colorToneMaxAlpha * 0.2],
            [255, 255, 0, _this.colorToneMaxAlpha * 0.4],
            [255, 255, 0, _this.colorToneMaxAlpha * 0.6],
            [255, 255, 0, _this.colorToneMaxAlpha * 0.8],
            [255, 255, 0, _this.colorToneMaxAlpha],
            [255, 255, 0, _this.colorToneMaxAlpha],
            [255, 255, 0, _this.colorToneMaxAlpha * 0.8],
            [255, 255, 0, _this.colorToneMaxAlpha * 0.6],
            [255, 255, 0, _this.colorToneMaxAlpha * 0.4],
            [255, 255, 0, _this.colorToneMaxAlpha * 0.2],
            [255, 255, 0, 0],
            [0, 0, 255, 0],
            [0, 0, 255, _this.colorToneMaxAlpha * 0.2],
            [0, 0, 255, _this.colorToneMaxAlpha * 0.4],
            [0, 0, 255, _this.colorToneMaxAlpha * 0.6],
            [0, 0, 255, _this.colorToneMaxAlpha * 0.8],
            [0, 0, 255, _this.colorToneMaxAlpha],
        ];
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
        _super.prototype.update.call(this, input);
    };
    RoamState.prototype.render = function (ctx) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        this.gameMap.render(ctx);
        this.player.render(ctx);
        State.prototype.render.call(this, ctx);
    };
    return RoamState;
}(State));
export default RoamState;
