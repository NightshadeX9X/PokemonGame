import State from "../core/State.js";
import StateStack from "../core/StateStack.js";
import { ChildOf } from "../util/functions.js";

class DelayState extends State {
	private elapsedFrames = 0;

	constructor(public stateStack: StateStack, public totalFrames = 60) {
		super(stateStack);
	}

	public get remainingFrames() {
		return this.totalFrames - this.elapsedFrames - 1;
	}

	public update() {
		if (this.remainingFrames <= 0) {
			this.remove();
			return;
		}
		this.elapsedFrames++;
	}

	static async create(ss: StateStack, frames: number) {
		const ds = new DelayState(ss, frames);
		await ss.push(ds);
		await ds.waitForRemoval();
	}
}

export default DelayState;