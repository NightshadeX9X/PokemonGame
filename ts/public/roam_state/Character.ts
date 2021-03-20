import { Preloadable, Renderable } from "../core/Attributes.js";
import Loader from "../core/Loader.js";
import RoamState from "../states/RoamState.js";
import Direction from "../util/Direction.js";
import Events from "../util/Events.js";
import Spritesheet from "../util/Spritesheet.js";
import Vector from "../util/Vector.js";
import DelayState from '../states/DelayState.js';
import State from "../core/State.js";

class Character implements Preloadable, Renderable {
	public walking = false;
	public canWalk = true;

	public evtHandler = new Events.Handler();

	private image = null as unknown as HTMLImageElement;
	private spritesheet = null as unknown as Spritesheet;

	public pos = new Vector();

	public direction = Direction.DOWN;
	public setDirection(d: Direction) {
		this.direction = d;
		this.updateSpritesheetFromDirection(d);
	}

	private updateSpritesheetFromDirection(direction = this.direction) {
		if (direction === Direction.DOWN) this.spritesheet.coords.y = 0;
		if (direction === Direction.LEFT) this.spritesheet.coords.y = 1;
		if (direction === Direction.RIGHT) this.spritesheet.coords.y = 2;
		if (direction === Direction.UP) this.spritesheet.coords.y = 3;
	}

	constructor(public roamState: RoamState, private imageName: string) {

	}

	public async preload(loader: Loader) {
		console.log(this)
		this.image = await loader.loadImage(`/assets/images/characters/${this.imageName}.png`);
		this.spritesheet = new Spritesheet(this.image);
	}
	public render(ctx: CanvasRenderingContext2D) {
		this.spritesheet.render(ctx, this.pos.diff(0, 1).prod(this.roamState.tileSize));
	}
	private async takeStep(direction: Direction, container: State) {
		const vec = Direction.toVector(direction).quo(16);
		this.spritesheet.coords.x++;
		if (this.spritesheet.coords.x > 3) this.spritesheet.coords.x = 0;

		for (let i = 0; i < 4; i++) {
			await State.runFuncAsState(container.subStateStack, () => this.pos.add(vec));
			await DelayState.create(container.subStateStack, 1);
		}
	}
	public async walk(direction: Direction) {
		if (!this.canWalk || this.walking) return;
		this.walking = true;
		this.setDirection(direction);

		const container = new State(this.roamState.backgroundProcesses);
		await this.roamState.backgroundProcesses.push(container);

		for (let i = 0; i < 4; i++) {
			await this.takeStep(direction, container);
		}

		container.remove();

		this.walking = false;
	}
}

export default Character;