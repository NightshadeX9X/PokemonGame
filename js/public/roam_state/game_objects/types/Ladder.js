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
import Vector from "../../../util/Vector.js";
import GameObject from "../GameObject.js";
var Ladder = /** @class */ (function (_super) {
    __extends(Ladder, _super);
    function Ladder(roamState, pos, size, topZIndex, bottomZIndex) {
        if (size === void 0) { size = new Vector(2); }
        var _this = _super.call(this, roamState, pos, size) || this;
        _this.topZIndex = topZIndex;
        _this.bottomZIndex = bottomZIndex;
        _this.evtHandler.addEventListener('player touch', function (oldPos, newPos) {
            console.log(newPos, oldPos);
            var top = _this.pos.y;
            var bottom = _this.pos.y + _this.size.y - 1;
            if (newPos.y === top)
                _this.roamState.player.zIndex = _this.topZIndex;
            if (newPos.y === bottom)
                _this.roamState.player.zIndex = _this.bottomZIndex;
        });
        return _this;
    }
    return Ladder;
}(GameObject));
export default Ladder;
