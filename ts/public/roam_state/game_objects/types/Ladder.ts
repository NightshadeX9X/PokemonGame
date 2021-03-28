import Loader from "../../../core/Loader.js";
import RoamState from "../../../states/RoamState.js";
import Vector from "../../../util/Vector.js";
import GameObject from "../GameObject.js";


class Ladder extends GameObject {
	constructor(roamState: RoamState, pos: Vector, size = new Vector(2), protected topZIndex: number, protected bottomZIndex: number) {
		super(roamState, pos, size);
	}
	async preload(loader: Loader) {
		await GameObject.prototype.preload.call(this, loader);
		this.evtHandler.addEventListener('player touch', (oldPos: Vector, newPos: Vector) => {
			const top = this.pos.y;
			const bottom = this.pos.y + this.size.y - 1;

			if (newPos.y === top) this.roamState.player.zIndex = this.topZIndex;
			if (newPos.y === bottom) this.roamState.player.zIndex = this.bottomZIndex;
		})
	}
	public getBlockingSquares() { return [] }

}

export default Ladder;