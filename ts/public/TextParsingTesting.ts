const original = "@[red] white #[bl [white] ue] $[green]!";

type Color = "red" | "white" | "blue" | "green";

interface CharData {
	char: string;
	color: Color;
}

interface Group {
	start: number;
	end: number;
	tag: string;
}

function parseText(original: string) {
	const data: CharData[] = [];
	const groups: Group[] = [];

	assignGroups(original, groups);
	console.log(groups)
	addChars(original, data, groups);


	function assignGroups(original: string, groups: Group[]) {
		const indexesOfBrackStart = allIndexesOf("[", original);
		const indexesOfBrackStartRev = indexesOfBrackStart.reverse();

		indexesOfBrackStartRev.forEach(startIndex => {
			const indexesOfBrackEnd = allIndexesOf("]", original).filter(i => i > startIndex);


			indexesOfBrackEnd.forEach(endIndex => {
				if (groupStartsOn(groups, startIndex)) return;
				if (groupEndsOn(groups, endIndex)) return;


				const charBeforeStart = original[startIndex - 1];
				groups.push({
					start: startIndex,
					end: endIndex,
					tag: charBeforeStart
				})
			})
		})

	}
	function addChars(original: string, data: CharData[], groups: Group[]) {
		const originalChars = original.split("");
		originalChars.forEach((oc, i) => {
			if (oc === "[" || oc === "]" || oc === "@") return;
			const group = groups.find(g => g.start < i && g.end > i);
			let color: Color = "white";
			if (group) {
				if (group.tag === "@") color = "red";
				if (group.tag === "$") color = "green";
				if (group.tag === "#") color = "blue";
			}
			data.push({
				char: oc,
				color
			})
		})
	}
	return data;
}

function allIndexesOf(searchTerm: string, whole: string) {
	const indexes: number[] = [];
	whole.split("").forEach((str, i) => {
		if (searchTerm === str) indexes.push(i)
	});
	return indexes;
}

function lastArrayMember<T>(arr: T[]) {
	return arr.reverse()[0];
}


function groupStartsOn(groups: Group[], index: number) {
	return groups.some(g => g.start === index);
}
function groupEndsOn(groups: Group[], index: number) {
	return groups.some(g => g.end === index);
}

const parsed = parseText(original);
parsed.forEach(charData => {
	console.log(`${charData.char} ${charData.color}`)
})