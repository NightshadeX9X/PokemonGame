import State from "../core/State.js";
var BlankState = /** @class */ (function () {
    function BlankState(stateStack) {
        this.stateStack = stateStack;
        State.call(this, stateStack);
    }
    return BlankState;
}());
export default BlankState;
