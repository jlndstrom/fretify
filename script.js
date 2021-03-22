const notes = [
    ["E"], 
    ["F"], 
    ["F#", "Gb"], 
    ["G"], 
    ["G#", "Ab"], 
    ["A"], 
    ["A#", "Bb"], 
    ["B", "Cb"], 
    ["C"], 
    ["C#", "Db"], 
    ["D"], 
    ["D#", "Eb"]
];

const formalNumbers = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th"];
const stringNames = ["E", "A", "D", "G"];
const strings = 4;

let state = { active: false, currResult: [] };

function runGame() {
    if (!state.active) {
        input.disabled = false;

        const s = generateStringNumber(strings);
        const f = generateFretNumber();

        state.currResult = procesNote(s, f);

        document.getElementById("intro").innerHTML = `What note is on the ${stringNames[s - 1]}-string on the ${formalNumbers[f - 1]} fret?`;
        document.getElementById("button").innerHTML = "Submit";

        state.active = true;
    } else {
        const curr = state.currResult.map(x => x.toLowerCase());
        const userAnswer = document.getElementById("input").value.toLowerCase();
        const formattedResult = state.currResult.length > 1 ? state.currResult.join(" or ") : state.currResult[0];

        if (curr.indexOf(userAnswer) > -1) {
            document.getElementById("intro").innerHTML = "Correct!";
        } else {
            document.getElementById("intro").innerHTML = `Wrong! It's ${formattedResult}.`;
        }

        state.active = false;
        document.getElementById("button").innerHTML = "Next";
    }
}

function generateStringNumber(numberOfStrings) {
    return Math.floor(Math.random() * numberOfStrings + 1);
}

function generateFretNumber() {
    return Math.floor(Math.random() * 12 + 1);
}

function procesNote(string, frets) {
    const sum = (string - 1) * 5 + frets;
    const noteIndex = sum >= 12 ? sum % 12 : sum;

    return notes[noteIndex];
}