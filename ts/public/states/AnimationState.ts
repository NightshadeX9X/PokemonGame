import Input from "../core/Input.js";
import Loader from "../core/Loader.js";
import State from "../core/State.js";
import StateStack from "../core/StateStack.js";
import Spritesheet from "../util/Spritesheet.js";
import Vector from "../util/Vector.js";
import RoamState from "./RoamState.js";

export default class AnimationState extends State {
	private options: {
		singleImageSize: Vector,
		amountOfImages: number,
		interval: number,
		popFramesBefore: number,
		scale: number,
		coordIncrement: Vector
	}
	constructor(public stateStack: StateStack, private spritesheet: Spritesheet, options: Partial<AnimationState["options"]> = {}) {
		super(stateStack);
		this.options = {
			singleImageSize: new Vector(16),
			amountOfImages: 1,
			interval: 0,
			popFramesBefore: 0,
			scale: 1,
			coordIncrement: new Vector(1, 0),
			...options
		}
	}

	private frames = 0;
	private increments = 0;

	public update(input: Input): void {
		if (!this.spritesheet) return;

		if (this.increments >= this.options.amountOfImages - this.options.popFramesBefore - 1) {
			this.remove();
			return
		}
		if (this.frames >= this.options.interval) {
			this.spritesheet.coords.add(this.options.coordIncrement);
			this.increments++;
			this.frames = -1;
		}
		this.frames++;
	}
}