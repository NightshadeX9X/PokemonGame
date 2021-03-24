import { Preloadable, Renderable, Updatable } from "../../core/Attributes.js";
import Input from "../../core/Input.js";
import RoamState from "../../states/RoamState.js";
import Events from "../../util/Events.js";
import Vector from "../../util/Vector.js";
import Character from "../Character.js";

class GameObject implements Preloadable, Updatable, Renderable {
	public evtHandler = new Events.Handler();
	public zIndex = 1;
	constructor(public roamState: RoamState, private pos = new Vector, private size = new Vector(1)) { }

	public getCoveredSquares() { return this.pos.rangeTo(this.pos.sum(this.size)) }

	public async preload() { }

	public update(input: Input) { }

	public render(ctx: CanvasRenderingContext2D) { }

	public getGameMapLayer() {
		return Character.prototype.getGameMapLayer.call(this);
	}
}

export default GameObject;