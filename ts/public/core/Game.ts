import BlackScreenState from "../states/BlackScreenState.js";
import { Preloadable, Updatable, Renderable } from "./Attributes.js";
import Input from "./Input.js";
import Loader from "./Loader.js";
import StateStack from "./StateStack.js";

class Game implements Preloadable, Updatable, Renderable {
	public loader = new Loader();
	public input = new Input();
	public cnv = document.getElementById('screen') as HTMLCanvasElement;
	public ctx = this.cnv.getContext('2d') as CanvasRenderingContext2D;

	public subStateStack = new StateStack(this, this);

	public readonly fps = 60;

	constructor() {

	}

	public async preload() {
		await this.subStateStack.push(new BlackScreenState(this.subStateStack));
	}
	public update() {
		this.subStateStack.update(this.input);
	}
	public render() {
		this.subStateStack.render(this.ctx);
	}
}

export default Game;