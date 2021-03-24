import RoamState from "../../../../states/RoamState.js";
import Vector from "../../../../util/Vector.js";
import GameObject from "../../GameObject.js";

class ladder1 extends GameObject {
	constructor(roamState: RoamState) {
		super(roamState, new Vector(1, 0), new Vector(2));
	}
	async onPlayerTouch() {
		console.log("ladder touched")
	}
}

export default ladder1;