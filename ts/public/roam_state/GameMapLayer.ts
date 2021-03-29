import { Preloadable, Renderable } from "../core/Attributes.js";
import Loader from "../core/Loader.js";
import Vector from "../util/Vector.js";
import GameMap from "./GameMap.js";

class GameMapLayer implements Preloadable, Renderable {
	private image = null as unknown as HTMLImageElement;
	private parts: (GameMapLayer.Part & { type: GameMapLayer.PartString })[][][] = [];

	constructor(public gameMap: GameMap, public zIndex: number) {

	}

	public async preload(loader: Loader) {
		const url = `/assets/images/maps/${this.gameMap.name}/${this.zIndex}.png`;
		console.log(url)
		this.image = await loader.loadImage(url);
		this.initParts();
	}

	private initParts() {
		const parts = this.gameMap.json.layers[this.zIndex].parts;
		if (!parts) return;
		const mapSize = this.gameMap.getSizeInTiles();
		for (let y = 0; y < mapSize.y; y++) {
			this.parts[y] = [];
			for (let x = 0; x < mapSize.x; x++) {
				this.parts[y][x] = [];
			}
		}

		for (const _partName in parts) {
			const partName = _partName as keyof typeof parts;

			const part = parts[partName];
			if (!part) return;

			part.forEach(data => {
				const [start, end] = Vector.fromStringRange(data.range);
				for (let y = start.y; y <= end.y; y++) {
					for (let x = start.x; x <= end.x; x++) {
						this.parts[y][x].push({ ...data, type: partName });
						this.parts[y][x] = this.parts[y][x].filter(other => {
							if (other.type === partName && (other.priority || 0) < (data.priority || 0)) return false;
							return true;
						})
					}
				}
			})
		}
	}

	public partsAt(vec: Vector) {
		if (!Array.isArray(this.parts?.[vec.y]?.[vec.x])) return [];

		return this.parts[vec.y][vec.x].map(data => {
			return { type: data.type, value: data.value };
		})
	}

	public render(ctx: CanvasRenderingContext2D) {
		const coords = this.gameMap.roamState.camera.convertCoords(new Vector);
		this.gameMap.roamState.camera.ctx.drawImage(this.image, coords.x, coords.y)
	}
}

namespace GameMapLayer {
	export type PartString = "wall";
	type WallPartValue = boolean | string;
	export type PartValue = WallPartValue;
	export type Part = NonNullUndefined<NonNullUndefined<GameMap.JSON["layers"][number]["parts"]>[PartString]>[number];
}

export default GameMapLayer;