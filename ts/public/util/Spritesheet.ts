import { Renderable } from "../core/Attributes.js";
import { ChildOf } from "./functions.js";
import Vector from "./Vector.js";

interface Spritesheet extends Renderable { }

class Spritesheet {
	constructor(public image: HTMLImageElement, public singleImageSize = new Vector(16, 32), public imageCount = new Vector(4), public coords = new Vector) { }

	render(ctx: CanvasRenderingContext2D, pos = new Vector()) {
		const coords = this.coords.prod(this.singleImageSize);
		ctx.drawImage(this.image, coords.x, coords.y, this.singleImageSize.x, this.singleImageSize.y, pos.x, pos.y, this.singleImageSize.x, this.singleImageSize.y)
	}
}

export default Spritesheet;