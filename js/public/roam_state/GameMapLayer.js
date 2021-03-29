var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
import Vector from "../util/Vector.js";
var GameMapLayer = /** @class */ (function () {
    function GameMapLayer(gameMap, zIndex) {
        this.gameMap = gameMap;
        this.zIndex = zIndex;
        this.image = null;
        this.parts = [];
    }
    GameMapLayer.prototype.preload = function (loader) {
        return __awaiter(this, void 0, void 0, function () {
            var url, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        url = "/assets/images/maps/" + this.gameMap.name + "/" + this.zIndex + ".png";
                        console.log(url);
                        _a = this;
                        return [4 /*yield*/, loader.loadImage(url)];
                    case 1:
                        _a.image = _b.sent();
                        this.initParts();
                        return [2 /*return*/];
                }
            });
        });
    };
    GameMapLayer.prototype.initParts = function () {
        var _this = this;
        var parts = this.gameMap.json.layers[this.zIndex].parts;
        if (!parts)
            return;
        var mapSize = this.gameMap.getSizeInTiles();
        for (var y = 0; y < mapSize.y; y++) {
            this.parts[y] = [];
            for (var x = 0; x < mapSize.x; x++) {
                this.parts[y][x] = [];
            }
        }
        var _loop_1 = function (_partName) {
            var partName = _partName;
            var part = parts[partName];
            if (!part)
                return { value: void 0 };
            part.forEach(function (data) {
                var _a = Vector.fromStringRange(data.range), start = _a[0], end = _a[1];
                for (var y = start.y; y <= end.y; y++) {
                    for (var x = start.x; x <= end.x; x++) {
                        _this.parts[y][x].push(__assign(__assign({}, data), { type: partName }));
                        _this.parts[y][x] = _this.parts[y][x].filter(function (other) {
                            if (other.type === partName && (other.priority || 0) < (data.priority || 0))
                                return false;
                            return true;
                        });
                    }
                }
            });
        };
        for (var _partName in parts) {
            var state_1 = _loop_1(_partName);
            if (typeof state_1 === "object")
                return state_1.value;
        }
    };
    GameMapLayer.prototype.partsAt = function (vec) {
        var _a, _b;
        if (!Array.isArray((_b = (_a = this.parts) === null || _a === void 0 ? void 0 : _a[vec.y]) === null || _b === void 0 ? void 0 : _b[vec.x]))
            return [];
        return this.parts[vec.y][vec.x].map(function (data) {
            return { type: data.type, value: data.value };
        });
    };
    GameMapLayer.prototype.render = function (ctx) {
        var coords = this.gameMap.roamState.camera.convertCoords(new Vector);
        this.gameMap.roamState.camera.ctx.drawImage(this.image, coords.x, coords.y);
    };
    return GameMapLayer;
}());
export default GameMapLayer;
