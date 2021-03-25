import Loader from "../../../core/Loader.js";
import RoamState from "../../../states/RoamState.js";
import { ChildOf } from "../../../util/functions.js";
import Vector from "../../../util/Vector.js";
import Character from "../../Character.js";
import GameObject from "../GameObject.js";

interface NPC extends GameObject, Character { }

@ChildOf(GameObject, Character)
class NPC {
	constructor(roamState: RoamState, imageName: string, pos = new Vector) {
		GameObject.call(this, roamState, pos, new Vector(1));
		Character.call(this, roamState, imageName);
	}

	public async preload(loader: Loader) {
		await Promise.all([
			GameObject.prototype.preload.call(this, loader),
			Character.prototype.preload.call(this, loader),
		])

	}

	public render(ctx: CanvasRenderingContext2D) {
		Character.prototype.render.call(this, ctx);
	}
}

export default NPC;