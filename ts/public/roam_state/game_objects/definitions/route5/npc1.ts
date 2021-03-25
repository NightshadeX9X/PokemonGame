import RoamState from "../../../../states/RoamState.js";
import NPC from "../../types/NPC.js";
import Vector from '../../../../util/Vector.js';
import Direction from "../../../../util/Direction.js";

class npc1 extends NPC {
	constructor(roamState: RoamState) {
		super(roamState, "player", new Vector(6, 24));
		this.setPos(new Vector(6, 24));
	}

	async onInteraction() {
		await this.walk(Direction.getRandom())
	}
}

export default npc1;