import Events from "../util/Events.js";
import { insertIntoArray } from "../util/functions.js";
import { Updatable, Renderable } from "./Attributes.js";
import Game from "./Game.js";
import Input from "./Input.js";
import State from "./State.js";

class StateStack implements Updatable, Renderable {
	public states: State[] = [];

	public evtHandler = new Events.Handler();

	constructor(public parent: StateStack.Parent, public game: Game) {

	}

	public async insert(state: State, index = 0) {
		this.states = insertIntoArray(this.states, index, [state]);
		await state.preload(this.game.loader);

		this.evtHandler.dispatchEvent('insert state', state, index);
		state.evtHandler.dispatchEvent('insert', this, index);
	}

	public async push(state: State) {
		await this.insert(state, this.states.length);
	}

	public remove(index: number) {
		const [state] = this.states.splice(index, 1);

		this.evtHandler.dispatchEvent('remove state', state, index);
		state.evtHandler.dispatchEvent('remove', this, index);
	}

	public fromTop(n = 0, ignoreNonBlocking = false) {
		const states = ignoreNonBlocking ? this.states.filter(s => s.blocking) : this.states;
		return states[this.states.length - 1 - n];
	}
	public fromBottom(n = 0, ignoreNonBlocking = false) {
		const states = ignoreNonBlocking ? this.states.filter(s => s.blocking) : this.states;
		return states[n];
	}

	private defaultToRenderState(s: State) { return this.states.includes(s); }
	private defaultToUpdateState(s: State) {
		return this.fromTop(0, true) === s;
	}

	private toRenderState(s: State) {
		if (s.toRender !== null) return s.toRender;
		return this.defaultToRenderState(s);
	}
	private toUpdateState(s: State) {
		if (s.toUpdate !== null) return s.toUpdate;
		return this.defaultToUpdateState(s);
	}

	public update(input: Input) {
		this.states.filter(s => this.toUpdateState(s)).forEach(s => {
			s.update(input);
		})
	}
	public render(ctx: CanvasRenderingContext2D) {
		this.states.filter(s => this.toRenderState(s)).forEach(s => {
			s.render(ctx);
		})
	}
}

namespace StateStack {
	export type Parent = State | Game;
}


export default StateStack;