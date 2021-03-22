import { Preloadable, Renderable } from "../core/Attributes.js";
import Loader from "../core/Loader.js";
import RoamState from "../states/RoamState.js";
import Vector from "../util/Vector.js";
import GameMapLayer from "./GameMapLayer.js";

class GameMap implements Preloadable {
	public json = null as unknown as GameMap.JSON;
	public layers: GameMapLayer[] = [];

	constructor(public roamState: RoamState, public name: string) {

	}

	public async preload(loader: Loader) {
		await this.loadJSON(loader);

		this.populateLayers();
		console.log(this.layers)

		await Promise.all(this.layers.map(layer => layer.preload(loader)));
	}

	public getSizeInTiles() {
		return Vector.fromString(this.json.sizeInTiles);
	}

	public getSizeInPx() {
		return this.getSizeInTiles().prod(this.roamState.tileSize);
	}

	private async loadJSON(loader: Loader) {
		const url = `/json/maps/${this.name}.json`;
		this.json = await loader.loadJSON(url) as GameMap.JSON;
	}

	private populateLayers() {
		for (let i = 0; i < this.json.layers.length; i++) {
			this.layers.push(new GameMapLayer(this, i));
		}
	}
}

namespace GameMap {
	export interface JSON {
		sizeInTiles: Vector.AsString;
		layers: {

		}[];
	}
}

export default GameMap;