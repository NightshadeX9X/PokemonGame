export default async function callRelatedEffectFns(_state: State, related: EffectFunctionHolder[]) {
	let state = _state;
	for (const r of related) {
		state = await r.effect(state);
	}
	return state;
}

interface AttackState {
	type: 'attack';
	damage: number;
	nullified: boolean;
	attack: Attack;
	attacker: Creature;
	defender: Creature;
}
type State = AttackState;

type EffectFunction = (state: State) => Promise<State>;
type EffectFunctionHolder = { effect: EffectFunction; };
class Ability {
	constructor(public name: string, public powerup = Ability.Powerup.NONE) {

	}

	async effect(state: AttackState) {
		if (state.type === "attack") {
			if (this.powerup === Ability.Powerup.DOUBLE_DAMAGE)
				state.damage *= 2;
			if (this.powerup === Ability.Powerup.HALF_DAMAGE)
				state.damage *= 0.5;
		}

		return state;
	}
}
namespace Ability {
	export enum Powerup {
		DOUBLE_DAMAGE,
		HALF_DAMAGE,
		CANNOT_SWITCH,
		NONE,
	}

	export namespace Types {
		export const HUGE_POWER = new Ability('huge power', Ability.Powerup.DOUBLE_DAMAGE);
		export const NONE = new Ability('none', Ability.Powerup.NONE);
	}
}



class Creature {
	public ability!: Ability;

	constructor(public name: string, public hp = 100) {

	}

	async effect(state: AttackState) {
		state = await callRelatedEffectFns(state, [state.attack, this.ability, state.defender]);

		return state;
	}

	async useAttack(attack: Attack, defender: Creature) {
		let state: AttackState = {
			type: 'attack',
			attack,
			attacker: this,
			defender,
			damage: 0,
			nullified: false,
		};

		state = await this.effect(state);

		console.log("Damage:", state.damage);
		console.log("Nullified:", state.nullified);

	}
}

class Attack {
	constructor(public name: string, public damage = 0) { }

	async effect(state: AttackState) {
		if (state.type === "attack") {
			state.damage = this.damage;
		}

		return state;
	}
}

const leafage = new Attack('leafage', 40);

const rowlet = new Creature('rowlet');
rowlet.ability = Ability.Types.HUGE_POWER;

const popplio = new Creature('rowlet');
popplio.ability = Ability.Types.NONE;

rowlet.useAttack(leafage, popplio).then(() => {

	console.log(popplio.hp)
})

