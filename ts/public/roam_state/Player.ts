import { Preloadable, Renderable, Updatable } from "../core/Attributes.js";
import Input from "../core/Input.js";
import Loader from "../core/Loader.js";
import RoamState from "../states/RoamState.js";
import Direction from "../util/Direction.js";
import Events from "../util/Events.js";
import { ChildOf } from "../util/functions.js";
import Vector from "../util/Vector.js";
import Character from "./Character.js";


class Player extends Character implements Updatable {
	private lastInteraction = 20;
	constructor(roamState: RoamState) {
		super(roamState, "player");

		this.evtHandler.addEventListener('walk', (oldPos: Vector, newPos: Vector, direction: Direction) => {
			const gos = this.roamState.gameObjects.filter(go => go.getCoveredSquares().find(v => v.equals(newPos)));
			gos.forEach(go => go.evtHandler.dispatchEvent('player touch', oldPos, newPos, direction));
		});
	}
	public update(input: Input) {
		(["LEFT", "RIGHT", "UP", "DOWN"] as const).forEach(d => {
			if (input.directionKeyStates[d]) {
				this.walk(Direction[d])
			}
		});

		if (input.interactionKey && this.lastInteraction >= 20 && !this.walking) {
			const posAhead = this.pos.sum(Direction.toVector(this.direction));
			const gos = this.roamState.gameObjects.filter(go => go.getCoveredSquares().find(v => v.equals(posAhead)));
			console.log(gos.map(go => go.evtHandler))
			gos.forEach(go => {
				go.evtHandler.dispatchEvent('interaction');
			})
			this.lastInteraction = -1;
		}
		this.lastInteraction++;
	}
}

export default Player;