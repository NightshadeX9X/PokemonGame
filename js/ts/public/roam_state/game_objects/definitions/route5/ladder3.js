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
import Ladder from "../../types/Ladder.js";
var ladder3 = /** @class */ (function (_super) {
    __extends(ladder3, _super);
    function ladder3(roamState) {
        return _super.call(this, roamState, new Vector(17, 14), new Vector(2), 3, 2) || this;
    }
    return ladder3;
}(Ladder));
export default ladder3;
