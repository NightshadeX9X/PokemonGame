import DelayState from "../../../states/DelayState.js";
import RoamState from "../../../states/RoamState.js";
import Vector from "../../../util/Vector.js";
import GameObject from "../GameObject.js";

class Grass extends GameObject {
	constructor(roamState: RoamState, pos: Vector, zIndex: number) {
		super(roamState, pos, new Vector(1));
		this.zIndex = zIndex;

		console.log(this.pos)
	}
	public async preload() {
		this.evtHandler.addEventListener('player touch', async () => {
			console.log("touched grass", this.zIndex);
		});
	}
	public getBlockingSquares() { return [] }
	public getTouchableSquares() { return [{ squares: [Vector.from(this.pos)], zIndex: this.zIndex }] }
}

export default Grass;