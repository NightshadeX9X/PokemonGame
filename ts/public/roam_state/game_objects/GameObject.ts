import { Preloadable, Renderable, Updatable } from "../../core/Attributes.js";
import Input from "../../core/Input.js";
import Loader from "../../core/Loader.js";
import RoamState from "../../states/RoamState.js";
import Direction from "../../util/Direction.js";
import Events from "../../util/Events.js";
import Vector from "../../util/Vector.js";
import Character from "../Character.js";

class GameObject implements Preloadable, Updatable, Renderable {
	public evtHandler = new Events.Handler();
	public zIndex = 1;
	constructor(public roamState: RoamState, public pos = new Vector, protected size = new Vector(1)) {

	}

	public getInteractionSquares() { return [{ squares: this.pos.rangeTo(this.pos.sum(this.size)), zIndex: this.zIndex }] }
	public getTouchableSquares() { return [{ squares: this.pos.rangeTo(this.pos.sum(this.size)), zIndex: this.zIndex }] }
	public getBlockingSquares() { return [{ squares: this.pos.rangeTo(this.pos.sum(this.size)), zIndex: this.zIndex }] }

	public async preload(loader: Loader) {
		this.evtHandler.addEventListener('player touch', (oldPos: Vector, newPos: Vector, direction: Direction) => {
			this.onPlayerTouch(oldPos, newPos, direction);
		});
		this.evtHandler.addEventListener('interaction', () => {
			this.onInteraction();
		});
	}

	public update(input: Input) { }

	public render(ctx: CanvasRenderingContext2D) { }

	public getGameMapLayer() {
		return Character.prototype.getGameMapLayer.call(this);
	}

	protected async onPlayerTouch(oldPos: Vector, newPos: Vector, direction: Direction) { }
	protected async onInteraction() { }
}

export default GameObject;