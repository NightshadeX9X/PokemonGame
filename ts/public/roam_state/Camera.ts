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

	constructor(public roamState: RoamState, public size: Vector) {
		const { ctx, cnv } = createCanvas(this.size);
		this.cnv = cnv;
		this.ctx = ctx;
	}

	public update() {
		this.pos.set(this.getTargetPos())
	}

	public render(ctx: CanvasRenderingContext2D) {
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