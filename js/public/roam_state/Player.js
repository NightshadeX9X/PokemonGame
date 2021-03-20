var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import Direction from "../util/Direction.js";
import { ChildOf } from "../util/functions.js";
import Vector from "../util/Vector.js";
import Character from "./Character.js";
var Player = /** @class */ (function () {
    function Player(roamState) {
        Character.call(this, roamState, "player");
        this.pos = new Vector(5);
    }
    Player.prototype.update = function (input) {
        var _this = this;
        ["LEFT", "RIGHT", "UP", "DOWN"].forEach(function (d) {
            if (input.directionKeyStates[d]) {
                _this.walk(Direction[d]);
            }
        });
    };
    Player = __decorate([
        ChildOf(Character)
    ], Player);
    return Player;
}());
export default Player;
