"use strict";
var text = "#{red @{blue} red}";
function parse(text) {
    var data = { groups: [], chars: [] };
    var dontOutput = ["@", "#", "%", "{", "}"];
    var chars = text.split("");
    var reverseChars = chars.reverse();
    reverseChars.forEach(function (char, index) {
        if (char === "{") {
            var textAfter = chars.slice(0, index).reverse().join("");
            console.log(textAfter);
            var endIndex_1 = textAfter.indexOf("}") + (chars.length - textAfter.length);
            if (data.groups.find(function (g) { return g.end === endIndex_1; }))
                return;
            data.groups.push({ start: chars.length - 1 - index, end: endIndex_1, tag: reverseChars[index + 1] });
        }
    });
    chars.reverse().forEach(function (char, index) {
        var color = "white";
        data.groups.forEach(function (group) {
            if (group.start < index && group.end > index) {
                if (group.tag === "#")
                    color = "red";
                if (group.tag === "@")
                    color = "blue";
                if (group.tag === "%")
                    color = "green";
            }
        });
        if (dontOutput.includes(char))
            return;
        data.chars.push({ char: char, color: color });
    });
    return data;
}
console.log(parse(text));
