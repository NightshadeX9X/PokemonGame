import { Preloadable, Renderable } from "../core/Attributes.js";
import Loader from "../core/Loader.js";
import GameMap from "./GameMap.js";

class GameMapLayer implements Preloadable, Renderable {
	private image = null as unknown as HTMLImageElement;

	constructor(public gameMap: GameMap, public zIndex: number) {

	}

	public async preload(loader: Loader) {
		const url = `/assets/images/maps/${this.gameMap.name}/${this.zIndex}.png`;
		console.log(url)
		this.image = await loader.loadImage(url);
	}

	public render(ctx: CanvasRenderingContext2D) {
		ctx.drawImage(this.image, 0, 0)
	}
}

export default GameMapLayer;