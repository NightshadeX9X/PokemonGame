import Bag from "../items/Bag.js";
import DelayState from "../states/DelayState.js";
import RoamState from "../states/RoamState.js";
import { Preloadable, Updatable, Renderable } from "./Attributes.js";
import BackgroundProcessStack from "./BackgroundProcessStack.js";
import Input from "./Input.js";
import Loader from "./Loader.js";
import State from "./State.js";
import StateStack from "./StateStack.js";
import Item from '../items/Item.js';

class Game implements Preloadable, Updatable, Renderable {
	public loader = new Loader();
	public input = new Input();
	public cnv = document.getElementById('screen') as HTMLCanvasElement;
	public ctx = this.cnv.getContext('2d') as CanvasRenderingContext2D;

	public subStateStack = new StateStack(this, this);
	public backgroundProcesses = new BackgroundProcessStack(this, this);

	public readonly fps = 60;

	public bag = new Bag();

	constructor() {

	}

	private init() {
		this.input.start(document);
		this.ctx.imageSmoothingEnabled = false;
		this.cnv.style.imageRendering = "pixelated";
	}

	public async preload() {
		this.init();

		await Promise.all([
			Item.loadAll(this.loader)
		]);

		await this.subStateStack.push(new RoamState(this.subStateStack));
	}
	public update() {
		this.subStateStack.update(this.input);
		this.backgroundProcesses.update(this.input);
	}
	public render() {
		this.subStateStack.render(this.ctx);
		this.backgroundProcesses.render(this.ctx);
	}
}

export default Game;