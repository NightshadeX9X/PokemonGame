const text = "#{red @{blue} red}";

interface TextData {
	groups: {
		start: number;
		end: number;
		tag: string;
	}[];
	chars: {
		char: string;
		color: string;
	}[]
}

function parse(text: string) {
	const data: TextData = { groups: [], chars: [] };
	const dontOutput = ["@", "#", "%", "{", "}"]
	const chars = text.split("");
	const reverseChars = chars.reverse();
	reverseChars.forEach((char, index) => {
		if (char === "{") {
			const textAfter = chars.slice(0, index).reverse().join("");
			console.log(textAfter);
			const endIndex = textAfter.indexOf("}") + (chars.length - textAfter.length);
			if (data.groups.find(g => g.end === endIndex)) return;
			data.groups.push({ start: chars.length - 1 - index, end: endIndex, tag: reverseChars[index + 1] })
		}
	})
	chars.reverse().forEach((char, index) => {
		let color = "white";
		data.groups.forEach(group => {
			if (group.start < index && group.end > index) {
				if (group.tag === "#") color = "red";
				if (group.tag === "@") color = "blue";
				if (group.tag === "%") color = "green";
			}
		})
		if (dontOutput.includes(char)) return;
		data.chars.push({ char, color })
	});
	return data;
}

console.log(parse(text))