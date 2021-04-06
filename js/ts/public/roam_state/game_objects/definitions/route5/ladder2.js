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
import Vector from "../../../../util/Vector.js";
import SidewaysLadder from "../../types/SidewaysLadder.js";
var ladder1 = /** @class */ (function (_super) {
    __extends(ladder1, _super);
    function ladder1(roamState) {
        var _this = _super.call(this, roamState, new Vector(37, 6), new Vector(38, 6), 2, 3) || this;
        console.log(_this.getTouchableSquares());
        return _this;
    }
    return ladder1;
}(SidewaysLadder));
export default ladder1;
