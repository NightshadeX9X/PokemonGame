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
import State from "../core/State.js";
import Vector from "../util/Vector.js";
var AnimationState = /** @class */ (function (_super) {
    __extends(AnimationState, _super);
    function AnimationState(stateStack, spritesheet, options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, stateStack) || this;
        _this.stateStack = stateStack;
        _this.spritesheet = spritesheet;
        _this.frames = 0;
        _this.increments = 0;
        _this.options = __assign({ singleImageSize: new Vector(16), amountOfImages: 1, interval: 0, popFramesBefore: 0, scale: 1, coordIncrement: new Vector(1, 0) }, options);
        return _this;
    }
    AnimationState.prototype.update = function (input) {
        if (!this.spritesheet)
            return;
        if (this.increments >= this.options.amountOfImages - this.options.popFramesBefore - 1) {
            this.remove();
            return;
        }
        if (this.frames >= this.options.interval) {
            this.spritesheet.coords.add(this.options.coordIncrement);
            this.increments++;
            this.frames = -1;
        }
        this.frames++;
    };
    return AnimationState;
}(State));
export default AnimationState;
