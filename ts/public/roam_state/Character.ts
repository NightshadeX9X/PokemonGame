import { Preloadable, Renderable } from "../core/Attributes.js";
import Loader from "../core/Loader.js";
import RoamState from "../states/RoamState.js";
import Direction from "../util/Direction.js";
import Events from "../util/Events.js";
import Spritesheet from "../util/Spritesheet.js";
import Vector from "../util/Vector.js";
import DelayState from '../states/DelayState.js';
import State from "../core/State.js";

const SIGNATURE = Symbol('Character signature');

class Character implements Preloadable, Renderable {
	public walking = false;
	public canWalk = true;
	public canTurn = true;
	public canWalkOutOfBounds = false;
	public canWalkThroughWalls = false;

	public freeze() { this.canWalk = false; this.canTurn = false; }
	public unfreeze() { this.canWalk = true; this.canTurn = true; }

	public evtHandler = new Events.Handler();

	private image = null as unknown as HTMLImageElement;
	private spritesheet = null as unknown as Spritesheet;

	public zIndex = 1;

	public pos = new Vector();
	public walkingToward = Vector.from(this.pos);

	private readonly [SIGNATURE] = true;
	public static isCharacter(c: any): c is Character {
		return c[SIGNATURE] === true;
	}

	public direction = Direction.DOWN;
	public setDirection(d: Direction) {
		if (!this.canTurn) return;
		this.direction = d;
		this.updateSpritesheetFromDirection(d);
	}

	private updateSpritesheetFromDirection(direction = this.direction) {
		if (direction === Direction.DOWN) this.spritesheet.coords.y = 0;
		if (direction === Direction.LEFT) this.spritesheet.coords.y = 1;
		if (direction === Direction.RIGHT) this.spritesheet.coords.y = 2;
		if (direction === Direction.UP) this.spritesheet.coords.y = 3;
	}

	constructor(public roamState: RoamState, private imageName: string) {
	}

	public async preload(loader: Loader) {
		console.log(this)
		this.image = await loader.loadImage(`/assets/images/characters/${this.imageName}.png`);
		this.spritesheet = new Spritesheet(this.image);
	}
	public render(ctx: CanvasRenderingContext2D) {
		if (!this.image || !this.spritesheet) return;
		const pos = this.roamState.camera.convertCoords(this.pos.diff(0, 1).prod(this.roamState.tileSize));
		this.spritesheet.render(this.roamState.camera.ctx, pos);
	}
	private async takeStep(direction: Direction, container: State) {
		const vec = Direction.toVector(direction).quo(16);
		this.spritesheet.coords.x++;
		if (this.spritesheet.coords.x > 3) this.spritesheet.coords.x = 0;

		for (let i = 0; i < 4; i++) {
			await State.runFuncAsState(container.subStateStack, () => this.pos.add(vec));
			await DelayState.create(container.subStateStack, 1);
		}
	}
	public async walk(direction: Direction) {
		if (!this.walking) {
			this.setDirection(direction);
		}
		if (!this.checkWalkingCapability(direction, this.pos)) return;

		const destination = this.pos.sum(Direction.toVector(direction));
		const oldPos = Vector.from(this.pos);
		this.walking = true;
		this.walkingToward.set(destination);

		const container = new State(this.roamState.backgroundProcesses);
		await this.roamState.backgroundProcesses.push(container);

		for (let i = 0; i < 4; i++) {
			await this.takeStep(direction, container);
		}

		container.remove();

		this.walking = false;
		this.evtHandler.dispatchEvent('walk', oldPos, destination, direction);
	}

	private checkWalkingCapability(direction: Direction, currentPos: Vector) {
		const toPos = currentPos.sum(Direction.toVector(direction));
		const mapSize = this.roamState.gameMap.getSizeInTiles();

		if (!this.canWalk || this.walking) return false;
		if (this.roamState.stateStack.game.isCheatMode()) return true;

		if (!this.canWalkOutOfBounds) {
			if (toPos.x < 0 || toPos.y < 0 || toPos.x >= mapSize.x || toPos.y >= mapSize.y) return false;
		}

		if (!this.canWalkThroughWalls) {
			const layer = this.getGameMapLayer();
			const parts = layer.partsAt(toPos);
			if (parts.find(p => {
				if (p.type !== "wall") return false;
				if (typeof p.value === "boolean") return p.value;

				const str = p.value.toUpperCase();
				const chars = str.split("");
				return chars.includes(Direction.toString(Direction.invert(direction))[0]);
			})) return false;
		}

		{
			const allCharactersButThis = this.allInRoamState().filter(c => c !== this);
			for (const c of allCharactersButThis) {
				const coveredByC = [c.pos, c.walkingToward];
				if (coveredByC.some(v => v.equals(toPos))) return false;
			}
		}

		{
			if (this.roamState.gameObjects.some(go => go.getBlockingSquares().find(d => d.squares.find(v => v.equals(toPos)) && d.zIndex === this.zIndex))) return false;
		}

		return true;
	}

	public getGameMapLayer() {
		return this.roamState.gameMap.layers.find(l => l.zIndex === this.zIndex - 1)!;
	}

	public allInRoamState() {
		const things = [this.roamState.player, ...this.roamState.gameObjects] as Character[];
		const characters = things.filter(x => Character.isCharacter(x));
		return characters;
	}

	public setPos(pos: Vector) {
		this.pos.set(pos);
		this.walkingToward.set(pos);
	}
}

export default Character;