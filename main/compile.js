function getCaretCoordinates() {
    let x = 0,
    y = 0;
    const isSupported = typeof window.getSelection !== "undefined";
    if (isSupported) {
      const selection = window.getSelection();
      if (selection.rangeCount !== 0) {
        const range = selection.getRangeAt(0).cloneRange();
        range.collapse(true);
        const rect = range.getClientRects()[0];
        if (rect) {
          x = rect.left;
          y = rect.top;
        }
      }
    }
    return [x, y];
} // This function was taken from https://javascript.plainenglish.io/how-to-find-the-caret-inside-a-contenteditable-element-955a5ad9bf81

function getCaretIndex(element) {
    let position = 0;
    const isSupported = typeof window.getSelection !== "undefined";
    if (isSupported) {
      const selection = window.getSelection();
      if (selection.rangeCount !== 0) {
        const range = window.getSelection().getRangeAt(0);
        const preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(element);
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        position = preCaretRange.toString().length;
      }
    }
    return position;
} // This function was taken from https://javascript.plainenglish.io/how-to-find-the-caret-inside-a-contenteditable-element-955a5ad9bf81

let suggestionBox = document.getElementById('auto-suggestions');

function getWordAtCaret(caretIndex) {
    let characters = split(codeInput.innerText);
    /*let i = 1;
    while (characters[caretIndex - i] !== ' ' || characters[caretIndex - i] !== '<') {
        i++;
    }
    i--;
    let firstLetterIndex = caretIndex - i;*/
    let i = 1;
    while (characters[characters.length - i] !== ' ' || characters[characters.length - i] !== '<') {
        if (i > 10) {
            console.log('MORE THAN 10');
            console.log(characters);
            break;
        }
        i++;
    }
    let firstLetterIndex = characters.length - i;
    console.log(firstLetterIndex);
}

function displaySuggestionBox(coordinates) {
    let characters = split(codeInput.innerText);
    let x = coordinates[0];
    let y = coordinates[1];
    let lineVariation = ((Math.ceil(y) - 148) / 18) - 1;
    if (x === 0 && y === 0) {
        suggestionBox.style.display = 'none';
    }
    else {
        let caretIndex = getCaretIndex(codeInput) + lineVariation;

        if (characters[caretIndex] !== '>' && characters[caretIndex] !== ' ') {
            suggestionBox.style.display = 'block';
            suggestionBox.style.left = x + 'px';
            suggestionBox.style.top = (y + 25) + 'px';
            getWordAtCaret(caretIndex);
        }
        else {
            suggestionBox.style.display = 'none';
        }
    }
}

// ----------------- HTML SYNTAX HIGHLIGHTING -------------------

let firstTime = true;

function split(code) {
    let chars = [];
    for (let i = 0; i < code.length; i++) {
        chars.push(code[i]);
    }
    return chars;
}

function removeUnicode(code) {
    for (let i = 0; i < code.length; i++) {
        if (code[i] === '&' && code[i+1] === 'l' && code[i+2] === 't' && code[i+3] === ';') {
            code.splice(i, 4, '<');
        }

        if (code[i] === '&' && code[i+1] === 'g' && code[i+2] === 't' && code[i+3] === ';') {
            code.splice(i, 4, '>');
        }
    }
    return code;
}

function colorOpenClose(code) {
    for (let i = 0; i < code.length; i++) {
        if (code[i] === '<') {
            code[i] = '<span class="open-closePreset">&lt;</span>';
        }
        if (code[i] === '>') {
            code[i] = '<span class="open-closePreset">&gt;</span>';
        }
        if (code[i] === '/') {
            code[i] = '<span class="open-closePreset">/</span>';
        }
    }
    return code;
}

function colorTagName(code) {
    for (let i = 0; i < code.length; i++) {
        if (code[i] === '<span class="open-closePreset">&lt;</span>') {
            if (code[i+1] === '<span class="open-closePreset">/</span>') {
                i++;
            }
            let j = 1;
            let tagName = '';
            while (code[i + j] !== ' ' && code[i + j] !== '<span class="open-closePreset">&gt;</span>') {
                tagName += code[i + j];
                j++;
            }
            code.splice(i+1, tagName.length, '<span class="tag-namePreset">'+tagName+'</span>');
        }
    }
    return code;
}

function colorAttributes(code) {
    for (let i = 0; i < code.length; i++) {
        if (code[i] === ' ') {
            let j = 1;
            let attributeName = '';
            while (code[i + j] !== ' ' && code[i + j] !== '<span class="open-closePreset">&gt;</span>' && code[i + j] !== '=' && code[i + j] !== '<span class="open-closePreset">&lt;</span>') {
                attributeName += code[i + j];
                j++;
            }
            code.splice(i+1, attributeName.length, '<span class="attribute-namePreset">'+attributeName+'</span>');
        }
    }
    return code;
}

function colorValues(code) {
    for (let i = 0; i < code.length; i++) {
        if (code[i] === '"') {
            let j = 1;
            let valueName = '';
            while (code[i + j] !== '"') {
                valueName += code[i + j];
                j++;
            }
            code.splice(i, valueName.length + 2, '<span class="value-namePreset">"'+valueName+'"</span>');
        }
    }
    return code;
}

function backToString(code) {
    let newStr = '';
    for (let i = 0; i < code.length; i++) {
        newStr += code[i];
    }
    return newStr;
}

function placeCaretAtEnd(el) {
    el.focus();
    if (typeof window.getSelection != "undefined"
            && typeof document.createRange != "undefined") {
        var range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (typeof document.body.createTextRange != "undefined") {
        var textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.collapse(false);
        textRange.select();
    }
} // This function was taken from www.stackoverflow.com

function compileHTML(textBox) {
    let characters = split(textBox);
    let removedUnicode = removeUnicode(characters);
    let addOpenClose = colorOpenClose(removedUnicode);
    let addTagNames = colorTagName(addOpenClose);
    let addAttributes = colorAttributes(addTagNames);
    let addValues = colorValues(addAttributes)
    let newCodeString = backToString(addValues);

    return newCodeString;
} // This function adds syntax highlighting to HTML code

// --------------- CSS SYNTAX HIGHLIGHTING -----------------

function colorSelectors(code) {
    for (let i = 0; i < code.length; i++) {
        if (code[i] === '#' || code[i] === '.') {
            let j = 0;
            let selectorName = '';
            while (code[i + j] !== ' ' || code[j + i] !== '{' || j > 20) {
                selectorName += code[i + j];
                j++;
            }
            code.splice(i, selectorName.length, '<span class="selector-namePreset">'+selectorName+'</span>');
        }
    }
    return code;
}

function compileCSS(cssTextBox) {
    let cssCharacters = split(cssTextBox);
    console.log(cssCharacters);
    let coloredSelectors = colorSelectors(cssCharacters);
    console.log(coloredSelectors);
    return coloredSelectors;
}

// --------------- JS SYNTAX HIGHLIGHTING ------------------