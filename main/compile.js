let undo = document.getElementById('undo-container');

function split(code) {
    let chars = [];
    for (let i = 0; i < code.length; i++) {
        chars.push(code[i]);
    }
    return chars;
}

characters = split(codeInput.innerHTML);
console.log(characters);
for (let i = 0; i < characters.length; i++) {
    if (characters[i] === '&' && characters[i+1] === 'l' && characters[i+2] === 't' && characters[i+3] === ';') {
        characters.splice(i, 4, '<');
    }
}

for (let i = 0; i < characters.length; i++) {
    if (characters[i] === '&' && characters[i+1] === 'g' && characters[i+2] === 't' && characters[i+3] === ';') {
        characters.splice(i, 4, '>');
    }
}

console.log(characters);