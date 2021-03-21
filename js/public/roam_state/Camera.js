import { createCanvas } from "../util/functions.js";
import Vector from "../util/Vector.js";
var Camera = /** @class */ (function () {
    function Camera(roamState, size) {
        this.roamState = roamState;
        this.size = size;
        this.mode = Camera.Mode.FOLLOW_PLAYER;
        this.pos = this.getTargetPos();
        this.fixedPos = new Vector();
        var _a = createCanvas(this.size), ctx = _a.ctx, cnv = _a.cnv;
        this.cnv = cnv;
        this.ctx = ctx;
    }
    Camera.prototype.update = function () {
        this.pos.set(this.getTargetPos());
    };
    Camera.prototype.render = function (ctx) {
        ctx.drawImage(this.cnv, 0, 0);
        this.ctx.clearRect(0, 0, this.size.x, this.size.y);
    };
    Camera.prototype.convertCoords = function (coords) {
        return coords.diff(this.pos).sum(this.size.quo(2));
    };
    Camera.prototype.getTargetPos = function () {
        if (this.mode === Camera.Mode.FOLLOW_PLAYER)
            return this.roamState.player.pos.sum(0.5, 0).prod(this.roamState.tileSize);
        else
            return this.fixedPos;
    };
    return Camera;
}());
(function (Camera) {
    var Mode;
    (function (Mode) {
        Mode[Mode["FOLLOW_PLAYER"] = 0] = "FOLLOW_PLAYER";
        Mode[Mode["FIXED"] = 1] = "FIXED";
    })(Mode = Camera.Mode || (Camera.Mode = {}));
})(Camera || (Camera = {}));
export default Camera;
