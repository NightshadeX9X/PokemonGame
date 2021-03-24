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
import Direction from "../util/Direction.js";
import Character from "./Character.js";
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player(roamState) {
        var _this = _super.call(this, roamState, "player") || this;
        _this.evtHandler.addEventListener('walk', function (oldPos, newPos, direction) {
            var gos = _this.roamState.gameObjects.filter(function (go) { return go.getCoveredSquares().find(function (v) { return v.equals(newPos); }); });
            gos.forEach(function (go) { return go.evtHandler.dispatchEvent('player touch', oldPos, newPos, direction); });
        });
        return _this;
    }
    Player.prototype.update = function (input) {
        var _this = this;
        ["LEFT", "RIGHT", "UP", "DOWN"].forEach(function (d) {
            if (input.directionKeyStates[d]) {
                _this.walk(Direction[d]);
            }
        });
    };
    return Player;
}(Character));
export default Player;
