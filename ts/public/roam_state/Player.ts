import { Preloadable, Renderable, Updatable } from "../core/Attributes.js";
import Input from "../core/Input.js";
import Loader from "../core/Loader.js";
import RoamState from "../states/RoamState.js";
import Direction from "../util/Direction.js";
import Events from "../util/Events.js";
import { ChildOf } from "../util/functions.js";
import Vector from "../util/Vector.js";
import Character from "./Character.js";

interface Player extends Character { }

@ChildOf(Character)
class Player implements Updatable {
	constructor(roamState: RoamState) {
		Character.call(this, roamState, "player");

		this.pos = new Vector(5)
	}
	public update(input: Input) {
		(["LEFT", "RIGHT", "UP", "DOWN"] as const).forEach(d => {
			if (input.directionKeyStates[d]) {
				this.walk(Direction[d])
			}
		})
	}
}

export default Player;