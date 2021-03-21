import { ChildOf } from "../util/functions.js";
import Game from "./Game.js";
import State from "./State.js";
import StateStack from "./StateStack.js";


class BackgroundProcessStack extends StateStack {
	async insert(state: State, index = 0) {
		state.toUpdate = true;
		state.blocking = false;
		await StateStack.prototype.insert.call(this, state, index);
	}
}

export default BackgroundProcessStack;