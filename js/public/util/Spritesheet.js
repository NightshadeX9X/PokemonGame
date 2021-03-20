import Vector from "./Vector.js";
var Spritesheet = /** @class */ (function () {
    function Spritesheet(image, singleImageSize, imageCount, coords) {
        if (singleImageSize === void 0) { singleImageSize = new Vector(16, 32); }
        if (imageCount === void 0) { imageCount = new Vector(4); }
        if (coords === void 0) { coords = new Vector; }
        this.image = image;
        this.singleImageSize = singleImageSize;
        this.imageCount = imageCount;
        this.coords = coords;
    }
    Spritesheet.prototype.render = function (ctx, pos) {
        if (pos === void 0) { pos = new Vector(); }
        var coords = this.coords.prod(this.singleImageSize);
        ctx.drawImage(this.image, coords.x, coords.y, this.singleImageSize.x, this.singleImageSize.y, pos.x, pos.y, this.singleImageSize.x, this.singleImageSize.y);
    };
    return Spritesheet;
}());
export default Spritesheet;
