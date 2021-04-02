import RoamState from "../../../../states/RoamState.js";
import Vector from "../../../../util/Vector.js";
import Ladder from "../../types/Ladder.js";

class ladder3 extends Ladder {
	constructor(roamState: RoamState) {
		super(roamState, new Vector(17, 14), new Vector(2), 3, 2);
	}
}

export default ladder3;