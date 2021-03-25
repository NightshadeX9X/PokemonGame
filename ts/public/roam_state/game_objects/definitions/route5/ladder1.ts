import RoamState from "../../../../states/RoamState.js";
import Vector from "../../../../util/Vector.js";
import Ladder from "../../types/Ladder.js";

class ladder1 extends Ladder {
	constructor(roamState: RoamState) {
		super(roamState, new Vector(3, 19), new Vector(2), 2, 1);

	}
}

export default ladder1;