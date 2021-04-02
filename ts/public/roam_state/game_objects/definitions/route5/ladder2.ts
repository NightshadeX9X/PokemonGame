import RoamState from "../../../../states/RoamState.js";
import Vector from "../../../../util/Vector.js";
import SidewaysLadder from "../../types/SidewaysLadder.js";

class ladder1 extends SidewaysLadder {
	constructor(roamState: RoamState) {
		super(roamState, new Vector(37, 6), new Vector(38, 6), 2, 3);
	}
}

export default ladder1;