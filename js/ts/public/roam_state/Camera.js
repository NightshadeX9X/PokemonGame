import { createCanvas } from "../util/functions.js";
import Vector from "../util/Vector.js";
var Camera = /** @class */ (function () {
    function Camera(roamState, size) {
        this.roamState = roamState;
        this.size = size;
        this.mode = Camera.Mode.FOLLOW_PLAYER;
        this.pos = this.getTargetPos();
        this.fixedPos = new Vector();
        this.colorToneMaxAlphaDay = 0.1;
        this.colorToneMaxAlphaNight = 0.15;
        /** The color tone overlay displayed on top of the Camera display. The color varies depending on the hour
         * This list provides all the color tones using an array, from hour 0 (00:00) to hour 23 (23:00)
         * The current time is rounded to the nearest hour, and that index of the this array is the color tone to draw.
         * Color tones should only be rendered in outdoor maps.
         * Format: [Red, Green, Blue, Alpha]
        */
        this.colorTones = [
            [0, 0, 255, this.colorToneMaxAlphaNight],
            [0, 0, 255, this.colorToneMaxAlphaNight * 0.8],
            [0, 0, 255, this.colorToneMaxAlphaNight * 0.6],
            [0, 0, 255, this.colorToneMaxAlphaNight * 0.4],
            [0, 0, 255, this.colorToneMaxAlphaNight * 0.2],
            [0, 0, 255, 0],
            [255, 255, 0, 0],
            [255, 255, 0, this.colorToneMaxAlphaDay * 0.2],
            [255, 255, 0, this.colorToneMaxAlphaDay * 0.4],
            [255, 255, 0, this.colorToneMaxAlphaDay * 0.6],
            [255, 255, 0, this.colorToneMaxAlphaDay * 0.8],
            [255, 255, 0, this.colorToneMaxAlphaDay],
            [255, 255, 0, this.colorToneMaxAlphaDay],
            [255, 255, 0, this.colorToneMaxAlphaDay * 0.8],
            [255, 255, 0, this.colorToneMaxAlphaDay * 0.6],
            [255, 255, 0, this.colorToneMaxAlphaDay * 0.4],
            [255, 255, 0, this.colorToneMaxAlphaDay * 0.2],
            [255, 255, 0, 0],
            [0, 0, 255, 0],
            [0, 0, 255, this.colorToneMaxAlphaNight * 0.2],
            [0, 0, 255, this.colorToneMaxAlphaNight * 0.4],
            [0, 0, 255, this.colorToneMaxAlphaNight * 0.6],
            [0, 0, 255, this.colorToneMaxAlphaNight * 0.8],
            [0, 0, 255, this.colorToneMaxAlphaNight],
        ];
        var _a = createCanvas(this.size), ctx = _a.ctx, cnv = _a.cnv;
        this.cnv = cnv;
        this.ctx = ctx;
    }
    Camera.prototype.update = function () {
        this.pos.set(this.getTargetPos());
    };
    Camera.prototype.renderColorTones = function () {
        var date = new Date();
        var hour = date.getHours();
        if (date.getMinutes() >= 30)
            hour++;
        hour %= 24;
        var colorTone = this.colorTones[hour];
        this.ctx.save();
        this.ctx.fillStyle = "rgb(" + colorTone[0] + ", " + colorTone[1] + ", " + colorTone[2] + ", " + colorTone[3] + ")";
        this.ctx.fillRect(0, 0, this.size.x, this.size.y);
        this.ctx.restore();
    };
    Camera.prototype.render = function (ctx) {
        this.renderColorTones();
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
