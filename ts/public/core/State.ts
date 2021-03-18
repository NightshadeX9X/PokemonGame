import Events from "../util/Events.js";
import { Preloadable, Updatable, Renderable } from "./Attributes.js";
import Input from "./Input.js";
import Loader from "./Loader.js";
import StateStack from "./StateStack.js";

class State implements Preloadable, Updatable, Renderable {
	public toUpdate: boolean | null = null;
	public toRender: boolean | null = null;

	public blocking = true;

	protected subStateStack = new StateStack(this, this.stateStack.game);
	public backgroundProcesses = new StateStack(this, this.stateStack.game);

	public evtHandler = new Events.Handler();

	constructor(public stateStack: StateStack) {
		this.backgroundProcesses.insert = async (state, index) => {
			state.blocking = false;
			state.toUpdate = true;
			await StateStack.prototype.insert.call(this.backgroundProcesses, state, index);
		};
	}

	public async preload(loader: Loader) { }
	public update(input: Input) {
		this.subStateStack.update(input);
		this.backgroundProcesses.update(input);
	}
	public render(ctx: CanvasRenderingContext2D) {
		this.subStateStack.render(ctx);
		this.backgroundProcesses.render(ctx);
	}

	public get index() { return this.stateStack.states.indexOf(this) }

	public remove() {
		this.stateStack.remove(this.index);
	}

	public async waitForRemoval() {
		return new Promise<void>((resolve, reject) => {
			this.evtHandler.addEventListener('remove', () => {
				resolve();
			})
		})
	}

	public async addBackgroundProcess(s: State) {
		await this.backgroundProcesses.push(s);
	}
}

export default State;