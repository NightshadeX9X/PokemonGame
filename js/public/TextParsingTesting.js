"use strict";
var original = "@[red] white #[bl [white] ue] $[green]!";
function parseText(original) {
    var data = [];
    var groups = [];
    assignGroups(original, groups);
    console.log(groups);
    addChars(original, data, groups);
    function assignGroups(original, groups) {
        var indexesOfBrackStart = allIndexesOf("[", original);
        var indexesOfBrackStartRev = indexesOfBrackStart.reverse();
        indexesOfBrackStartRev.forEach(function (startIndex) {
            var indexesOfBrackEnd = allIndexesOf("]", original).filter(function (i) { return i > startIndex; });
            indexesOfBrackEnd.forEach(function (endIndex) {
                if (groupStartsOn(groups, startIndex))
                    return;
                if (groupEndsOn(groups, endIndex))
                    return;
                var charBeforeStart = original[startIndex - 1];
                groups.push({
                    start: startIndex,
                    end: endIndex,
                    tag: charBeforeStart
                });
            });
        });
    }
    function addChars(original, data, groups) {
        var originalChars = original.split("");
        originalChars.forEach(function (oc, i) {
            if (oc === "[" || oc === "]" || oc === "@")
                return;
            var group = groups.find(function (g) { return g.start < i && g.end > i; });
            var color = "white";
            if (group) {
                if (group.tag === "@")
                    color = "red";
                if (group.tag === "$")
                    color = "green";
                if (group.tag === "#")
                    color = "blue";
            }
            data.push({
                char: oc,
                color: color
            });
        });
    }
    return data;
}
function allIndexesOf(searchTerm, whole) {
    var indexes = [];
    whole.split("").forEach(function (str, i) {
        if (searchTerm === str)
            indexes.push(i);
    });
    return indexes;
}
function lastArrayMember(arr) {
    return arr.reverse()[0];
}
function groupStartsOn(groups, index) {
    return groups.some(function (g) { return g.start === index; });
}
function groupEndsOn(groups, index) {
    return groups.some(function (g) { return g.end === index; });
}
var parsed = parseText(original);
parsed.forEach(function (charData) {
    console.log(charData.char + " " + charData.color);
});
