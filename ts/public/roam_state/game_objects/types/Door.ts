import Loader from "../../../core/Loader.js";
import AnimationState from "../../../states/AnimationState.js";
import RoamState from "../../../states/RoamState.js";
import Spritesheet from "../../../util/Spritesheet.js";
import Vector from "../../../util/Vector.js";
import GameObject from "../GameObject.js";


class Door extends GameObject {
	protected image = null as unknown as HTMLImageElement;
	protected spritesheet = null as unknown as Spritesheet;
	constructor(roamState: RoamState, pos: Vector, public imageName: Door.ImageName) {
		super(roamState, pos, new Vector(1, 2));
	}

	public getBlockingSquares() { return [{ squares: [Vector.from(this.pos)], zIndex: this.zIndex }] }

	public async preload(loader: Loader) {
		await GameObject.prototype.preload.call(this, loader);
		this.image = await loader.loadImage(`/assets/images/doors/${this.imageName}.png`);
		this.spritesheet = new Spritesheet(this.image, new Vector(16), new Vector(6, 1));

		this.evtHandler.addEventListener('interaction', async () => {
			if (this.pos.y === this.roamState.player.pos.y) return;
			await this.open();
			console.log("door opened")
		});

		this.evtHandler.addEventListener('player touch', async () => {
			console.log("open door");
		});
	}

	protected async open() {
		const as = new AnimationState(this.roamState.backgroundProcesses, this.spritesheet,
			{
				singleImageSize: new Vector(16),
				amountOfImages: 6,
				interval: 4
			});

		this.roamState.player.freeze();

		await this.roamState.backgroundProcesses.push(as);
		await as.waitForRemoval();

		this.roamState.player.unfreeze();

	}

	public render(ctx: CanvasRenderingContext2D) {
		if (!this.image || !this.spritesheet) return;
		const coords = this.roamState.camera.convertCoords(this.pos);
		this.spritesheet.render(this.roamState.camera.ctx, coords);
	}
}

namespace Door {
	export type ImageName = "door1";
}

export default Door;