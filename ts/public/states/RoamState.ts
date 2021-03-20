import Input from "../core/Input.js";
import Loader from "../core/Loader.js";
import State from "../core/State.js";
import StateStack from "../core/StateStack.js";
import Player from "../roam_state/Player.js";
import { ChildOf } from "../util/functions.js";
import Vector from "../util/Vector.js";

interface RoamState extends State { }
@ChildOf(State)
class RoamState {
	public tileSize = 16;

	private player = new Player(this);

	public colorToneMaxAlpha = 0.4;
	/** The color tone overlay displayed on top of the Camera display. The color varies depending on the hour
	 * This list provides all the color tones using an array, from hour 0 (00:00) to hour 23 (23:00)
	 * The current time is rounded to the nearest hour, and that index of the this array is the color tone to draw.
	 * Color tones should only be rendered in outdoor maps.
	 * Format: [Red, Green, Blue, Alpha]
	*/
	public colorTones: [number, number, number, number][] = [
		[0, 0, 255, this.colorToneMaxAlpha], // 0
		[0, 0, 255, this.colorToneMaxAlpha * 0.8], // 1
		[0, 0, 255, this.colorToneMaxAlpha * 0.6], // 2
		[0, 0, 255, this.colorToneMaxAlpha * 0.4], // 3
		[0, 0, 255, this.colorToneMaxAlpha * 0.2], // 4
		[0, 0, 255, 0], // 5
		[255, 255, 0, 0], // 6
		[255, 255, 0, this.colorToneMaxAlpha * 0.2], // 7
		[255, 255, 0, this.colorToneMaxAlpha * 0.4], // 8
		[255, 255, 0, this.colorToneMaxAlpha * 0.6], // 9
		[255, 255, 0, this.colorToneMaxAlpha * 0.8], // 10
		[255, 255, 0, this.colorToneMaxAlpha], // 11
		[255, 255, 0, this.colorToneMaxAlpha], // 12
		[255, 255, 0, this.colorToneMaxAlpha * 0.8], // 13
		[255, 255, 0, this.colorToneMaxAlpha * 0.6], // 14
		[255, 255, 0, this.colorToneMaxAlpha * 0.4], // 15
		[255, 255, 0, this.colorToneMaxAlpha * 0.2], // 16
		[255, 255, 0, 0], // 17
		[0, 0, 255, 0], // 18
		[0, 0, 255, this.colorToneMaxAlpha * 0.2], // 19
		[0, 0, 255, this.colorToneMaxAlpha * 0.4], // 20
		[0, 0, 255, this.colorToneMaxAlpha * 0.6], // 21
		[0, 0, 255, this.colorToneMaxAlpha * 0.8], // 22
		[0, 0, 255, this.colorToneMaxAlpha], // 23
	]

	constructor(public stateStack: StateStack) {
		State.call(this, stateStack);

	}

	public async preload(loader: Loader) {
		await this.player.preload(loader);
	}
	public update(input: Input) {
		this.player.update(input);

		this.subStateStack.update(input);
		this.backgroundProcesses.update(input);
	}
	public render(ctx: CanvasRenderingContext2D) {
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

		this.player.render(ctx);

		State.prototype.render.call(this, ctx);
	}
}

export default RoamState;