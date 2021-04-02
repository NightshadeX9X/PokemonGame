import Loader from "../../../core/Loader.js";
import RoamState from "../../../states/RoamState.js";
import Direction from "../../../util/Direction.js";
import Vector from "../../../util/Vector.js";
import GameObject from "../GameObject.js";


class SidewaysLadder extends GameObject {
	constructor(roamState: RoamState, protected left: Vector, protected right: Vector, protected leftZIndex: number, protected rightZIndex: number) {
		super(roamState, left, right.diff(left).sum(1));
	}
	async preload(loader: Loader) {
		await GameObject.prototype.preload.call(this, loader);
		this.evtHandler.addEventListener('player touch', (oldPos: Vector, newPos: Vector, direction: Direction) => {
			console.log(newPos, direction)
			if (newPos.equals(this.left)) this.roamState.player.zIndex = this.leftZIndex;
			if (newPos.equals(this.right)) this.roamState.player.zIndex = this.rightZIndex;
		})
	}
	public getBlockingSquares() { return [] }
	public getTouchableSquares() {
		return [this.leftZIndex, this.rightZIndex].map(zIndex => ({ squares: [this.left, this.right], zIndex }));

	}

}

export default SidewaysLadder;