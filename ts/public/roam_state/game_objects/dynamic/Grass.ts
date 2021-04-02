import GameObject from "../GameObject.js";

class Grass extends GameObject {
	public async preload() {
		this.evtHandler.addEventListener('player touch', () => console.log("touched grass", this.zIndex));
	}
	public getBlockingSquares() { return [] }
}

export default Grass;