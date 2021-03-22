interface AttackState {
	type: 'attack';
	attacker: Creature;
	attack: Attack;
	defender: Creature;
	nullified: boolean;
	damageModifiers: number[];
}
interface SwitchState {
	type: 'switch';
	switcher: Creature;
	replacement: Creature;
	allowed: boolean;
}
type State = AttackState | SwitchState;
type EffectFunction = (state: State) => Promise<State>;

class Ability {
	powerup = Ability.Powerup.NONE;
	constructor(public name: string, public owner: Creature) {

	}
	async effect(state: State) {
		if (state.type === "attack") {
			if (state.attacker === this.owner) {
				if (this.powerup === Ability.Powerup.DOUBLE_DAMAGE) {
					state.damageModifiers.push(2);
				} else if (this.powerup === Ability.Powerup.HALF_DAMAGE) {
					state.damageModifiers.push(0.5);
				}
			}
		} else if (state.type === "switch") {
			if (state.switcher === this.owner) {
				if (this.powerup === Ability.Powerup.CANNOT_SWITCH) {
					state.allowed = false;
				}
			}
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
}
class Creature {
	ability = new Ability("huge power", this);
	constructor(public name: string, public hp = 100) {

	}

	async effect(state: State) {
		if (state.type === "attack" && state.defender === this && this.name === "rowlet") state.nullified = true;
		return state;
	}

	async useAttack(attack: Attack, defender: Creature) {
		let state: AttackState = { type: 'attack', attacker: this, attack, defender, damageModifiers: [], nullified: false }
		const effectFunctionHolders: { effect: EffectFunction }[] = [this, attack, defender, this.ability,];
		const effectFunctions = effectFunctionHolders.map(efh => efh.effect.bind(efh));
		for (const fn of effectFunctions) {
			(state as any) = await fn(state);
		}

		const multiplier = state.damageModifiers.reduce((acc, curr) => acc * curr, 1);
		if (!state.nullified) defender.hp -= attack.damage * multiplier;
	}

	async switchOut() {
		let state: SwitchState = { type: 'switch', switcher: this, replacement: this, allowed: true };
		const effectFunctionHolders: { effect: EffectFunction }[] = [this, this.ability];
		const effectFunctions = effectFunctionHolders.map(efh => efh.effect.bind(efh));
		for (const fn of effectFunctions) {
			(state as any) = await fn(state);
		}

		if (state.allowed) console.log(`${this.name} switched out!`)
	}
}

class Attack {
	constructor(public name: string, public damage = 0) { }
	async effect(state: State) {
		return state;
	}
}

const rowlet = new Creature('rowlet');
rowlet.ability.powerup = Ability.Powerup.CANNOT_SWITCH;
const popplio = new Creature('popplio');

const leafage = new Attack('leafage', 40);
(async () => {
	await popplio.useAttack(leafage, rowlet);
	await rowlet.switchOut();
})();


console.log(rowlet.hp)