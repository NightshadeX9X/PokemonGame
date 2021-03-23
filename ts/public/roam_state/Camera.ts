import { Renderable, Updatable } from "../core/Attributes.js";
import RoamState from "../states/RoamState.js";
import { createCanvas } from "../util/functions.js";
import Vector from "../util/Vector.js";

class Camera implements Renderable, Updatable {
	public mode = Camera.Mode.FOLLOW_PLAYER;

	private pos = this.getTargetPos();
	private fixedPos = new Vector();

	private cnv: HTMLCanvasElement;
	public ctx: CanvasRenderingContext2D;

	private colorToneMaxAlphaDay = 0.1;
	private colorToneMaxAlphaNight = 0.15;
	/** The color tone overlay displayed on top of the Camera display. The color varies depending on the hour
	 * This list provides all the color tones using an array, from hour 0 (00:00) to hour 23 (23:00)
	 * The current time is rounded to the nearest hour, and that index of the this array is the color tone to draw.
	 * Color tones should only be rendered in outdoor maps.
	 * Format: [Red, Green, Blue, Alpha]
	*/
	private colorTones: [number, number, number, number][] = [
		[0, 0, 255, this.colorToneMaxAlphaNight], // 0
		[0, 0, 255, this.colorToneMaxAlphaNight * 0.8], // 1
		[0, 0, 255, this.colorToneMaxAlphaNight * 0.6], // 2
		[0, 0, 255, this.colorToneMaxAlphaNight * 0.4], // 3
		[0, 0, 255, this.colorToneMaxAlphaNight * 0.2], // 4
		[0, 0, 255, 0], // 5
		[255, 255, 0, 0], // 6
		[255, 255, 0, this.colorToneMaxAlphaDay * 0.2], // 7
		[255, 255, 0, this.colorToneMaxAlphaDay * 0.4], // 8
		[255, 255, 0, this.colorToneMaxAlphaDay * 0.6], // 9
		[255, 255, 0, this.colorToneMaxAlphaDay * 0.8], // 10
		[255, 255, 0, this.colorToneMaxAlphaDay], // 11
		[255, 255, 0, this.colorToneMaxAlphaDay], // 12
		[255, 255, 0, this.colorToneMaxAlphaDay * 0.8], // 13
		[255, 255, 0, this.colorToneMaxAlphaDay * 0.6], // 14
		[255, 255, 0, this.colorToneMaxAlphaDay * 0.4], // 15
		[255, 255, 0, this.colorToneMaxAlphaDay * 0.2], // 16
		[255, 255, 0, 0], // 17
		[0, 0, 255, 0], // 18
		[0, 0, 255, this.colorToneMaxAlphaNight * 0.2], // 19
		[0, 0, 255, this.colorToneMaxAlphaNight * 0.4], // 20
		[0, 0, 255, this.colorToneMaxAlphaNight * 0.6], // 21
		[0, 0, 255, this.colorToneMaxAlphaNight * 0.8], // 22
		[0, 0, 255, this.colorToneMaxAlphaNight], // 23
	]

	constructor(public roamState: RoamState, public size: Vector) {
		const { ctx, cnv } = createCanvas(this.size);
		this.cnv = cnv;
		this.ctx = ctx;
	}

	public update() {
		this.pos.set(this.getTargetPos())
	}

	private renderColorTones() {
		const date = new Date();
		let hour = date.getHours();
		if (date.getMinutes() >= 30) hour++;
		hour %= 24;
		const colorTone = this.colorTones[hour];

		this.ctx.save();
		this.ctx.fillStyle = `rgb(${colorTone[0]}, ${colorTone[1]}, ${colorTone[2]}, ${colorTone[3]})`
		this.ctx.fillRect(0, 0, this.size.x, this.size.y);
		this.ctx.restore();
	}

	public render(ctx: CanvasRenderingContext2D) {
		this.renderColorTones();

		ctx.drawImage(this.cnv, 0, 0);
		this.ctx.clearRect(0, 0, this.size.x, this.size.y)
	}

	public convertCoords(coords: Vector) {
		return coords.diff(this.pos).sum(this.size.quo(2));
	}

	private getTargetPos() {
		if (this.mode === Camera.Mode.FOLLOW_PLAYER) return this.roamState.player.pos.sum(0.5, 0).prod(this.roamState.tileSize);
		else return this.fixedPos;
	}
}

namespace Camera {
	export enum Mode {
		FOLLOW_PLAYER,
		FIXED
	}
}

export default Camera;