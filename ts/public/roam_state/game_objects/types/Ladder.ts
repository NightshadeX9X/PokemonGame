import RoamState from "../../../states/RoamState.js";
import Vector from "../../../util/Vector.js";
import GameObject from "../GameObject.js";


class Ladder extends GameObject {
	constructor(roamState: RoamState, pos: Vector, size = new Vector(2), protected topZIndex: number, protected bottomZIndex: number) {
		super(roamState, pos, size);

		this.evtHandler.addEventListener('player touch', (oldPos: Vector, newPos: Vector) => {
			console.log(newPos, oldPos);
			const top = this.pos.y;
			const bottom = this.pos.y + this.size.y - 1;

			if (newPos.y === top) this.roamState.player.zIndex = this.topZIndex;
			if (newPos.y === bottom) this.roamState.player.zIndex = this.bottomZIndex;
		})
	}
}

export default Ladder;