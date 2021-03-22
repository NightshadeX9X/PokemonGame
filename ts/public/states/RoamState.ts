import Input from "../core/Input.js";
import Loader from "../core/Loader.js";
import State from "../core/State.js";
import StateStack from "../core/StateStack.js";
import Camera from "../roam_state/Camera.js";
import GameMap from "../roam_state/GameMap.js";
import Player from "../roam_state/Player.js";
import { ChildOf } from "../util/functions.js";
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
	public render(ctx: CanvasRenderingContext2D) {
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

		this.gameMap.render(ctx);
		this.player.render(ctx);

		this.camera.render(ctx);

		State.prototype.render.call(this, ctx);
	}
}

export default RoamState;