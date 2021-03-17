import State from "../core/State.js";
import StateStack from "../core/StateStack.js";
import { ChildOf } from "../util/functions.js";

interface BlackScreenState extends State { }

@ChildOf(State)
class BlackScreenState {
	constructor(public stateStack: StateStack) {
		State.call(this, stateStack);
	}

	public render(ctx: CanvasRenderingContext2D) {
		ctx.save();
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		ctx.restore();
	}
}

export default BlackScreenState;