import State from "../core/State.js";
import StateStack from "../core/StateStack.js";

interface BlankState extends State { }

class BlankState {
	constructor(public stateStack: StateStack) {
		State.call(this, stateStack);
	}
}

export default BlankState;