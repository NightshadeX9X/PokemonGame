import Input from "../core/Input.js";
import Loader from "../core/Loader.js";
import State from "../core/State.js";
import StateStack from "../core/StateStack.js";
import Camera from "../roam_state/Camera.js";
import Character from "../roam_state/Character.js";
import GameMap from "../roam_state/GameMap.js";
import GameMapLayer from "../roam_state/GameMapLayer.js";
import Player from "../roam_state/Player.js";
import Vector from "../util/Vector.js";

class RoamState extends State {
	public tileSize = 16;

	public player = new Player(this);
	public gameMap = new GameMap(this, "route5");
	public camera = new Camera(this, new Vector(480, 320));

	public async preload(loader: Loader) {
		await Promise.all([
			this.player.preload(loader),
			this.gameMap.preload(loader),
		]);
	}
	public update(input: Input) {
		this.player.update(input);

		this.camera.update();

		super.update(input);
	}
	private getRenderablesSorted() {
		function getPriority(renderable: Character | GameMapLayer) {
			if (renderable instanceof GameMapLayer) return 0;
			return 1;
		}
		let renderables = [this.player, ...this.gameMap.layers];
		renderables.sort((a, b) => {
			if (a.zIndex !== b.zIndex) return a.zIndex - b.zIndex;
			if (getPriority(a) !== getPriority(b)) return getPriority(a) - getPriority(b);
			const aPos = (a as any).pos as Vector || new Vector;
			const bPos = (b as any).pos as Vector || new Vector;
			if (aPos.y !== bPos.y) return aPos.y - bPos.y;

			return 0;
		})
		return renderables;
	}
	private renderRenderables(ctx: CanvasRenderingContext2D) {
		const renderables = this.getRenderablesSorted();
		renderables.forEach(renderable => {
			renderable.render(ctx);
		})
	}
	public render(ctx: CanvasRenderingContext2D) {
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

		this.renderRenderables(ctx);

		this.camera.render(ctx);

		State.prototype.render.call(this, ctx);
	}
}

export default RoamState;