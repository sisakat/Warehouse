/* **************************************
    Generate colors out of a given String
***************************************** */

colors = [
    "green",
    "blue",
    "red",
    "violet"
];

function stringToNumber(str) {
    let number = 0;
    for(let i = 0; i < str.length; i++) {
        number += str.charCodeAt(i);
    }
    return number;
}

function stringToColor(str) {
    let number = stringToNumber(str);
    return colors[number%colors.length];
}