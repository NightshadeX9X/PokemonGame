import Events from "../util/Events.js";
import { Preloadable, Updatable, Renderable } from "./Attributes.js";
import BackgroundProcessStack from "./BackgroundProcessStack.js";
import Input from "./Input.js";
import Loader from "./Loader.js";
import StateStack from "./StateStack.js";

class State implements Preloadable, Updatable, Renderable {
	public toUpdate: boolean | null = null;
	public toRender: boolean | null = null;

	public blocking = true;

	public subStateStack = new StateStack(this, this.stateStack.game);
	public backgroundProcesses = new BackgroundProcessStack(this, this.stateStack.game);

	public evtHandler = new Events.Handler();

	constructor(public stateStack: StateStack) { }

	public async preload(loader: Loader) { }
	public update(input: Input) {
		this.subStateStack.update(input);
		this.backgroundProcesses.update(input);
	}
	public render(ctx: CanvasRenderingContext2D) {
		this.subStateStack.render(ctx);
		this.backgroundProcesses.render(ctx);
	}

	public getIndex() { return this.stateStack?.states.indexOf(this) ?? -1 }

	public remove() {
		if (!this.stateStack.states.includes(this)) return;
		this.stateStack.remove(this.getIndex());
	}

	public async waitForRemoval() {
		if (!this.stateStack.states.includes(this)) return;
		return new Promise<void>((resolve, reject) => {
			this.evtHandler.addEventListener('remove', () => {
				resolve();
			})
		})
	}

	public async addBackgroundProcess(s: State) {
		await this.backgroundProcesses.push(s);
	}

	public static createFunctionRunner(stateStack: StateStack, fn: () => any) {
		const state = new State(stateStack);
		state.preload = async loader => {
			await fn();
		};
		return state;
	}

	public static async runFuncAsState(stateStack: StateStack, fn: () => any) {
		const state = this.createFunctionRunner(stateStack, fn)
		await stateStack.push(state);
		state.remove();
		return state;
	}

	public async addAndWaitForRemoval() {
		await this.stateStack.push(this);
		await this.waitForRemoval();
	}
}

export default State;