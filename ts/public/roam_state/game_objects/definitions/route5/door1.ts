import RoamState from "../../../../states/RoamState.js";
import Vector from "../../../../util/Vector.js";
import Door from "../../types/Door.js";

class door1 extends Door {
	constructor(roamState: RoamState) {
		super(roamState, new Vector(), "door1")
	}
}

export default door1;