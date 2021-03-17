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

	public evtHandler = new Events.Handler();

	constructor(public stateStack: StateStack) {

	}

	public async preload(loader: Loader) { }
	public update(input: Input) { }
	public render(ctx: CanvasRenderingContext2D) { }

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
}

export default State;