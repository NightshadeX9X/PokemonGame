class UIDGen {
	private count = 0;
	constructor(private prefix = "") { }
	generate() {
		return `${this.prefix}:${this.count++}`;
	}
}

export default UIDGen;