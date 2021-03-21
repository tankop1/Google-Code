/*function split(code) {
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

function getTags(code) {
    for (let i = 0; i < code.length; i++) {
        if (code[i] === '<') {
            if (code[i+1] === '/') {
                i++;
            }
            let j = 1;
            let tagName = '';
            while (code[i + j] !== ' ' && code[i + j] !== '>') {
                tagName += code[i + j];
                j++;
            }
            if (tagName !== 'span' && tagName !== '/span') {
                code.splice(i+1, tagName.length, '<span class="tag-namePreset">'+tagName+'</span>');
            }
        }
    }
    return code;
}

function getAttributes(code) {
    for (let i = 0; i < code.length; i++) {
        if (code[i] === ' ') {
            let j = 1;
            let attributeName = '';
            while (code[i + j] !== ' ' && code[i + j] !== '>' && code[i + j] !== '=') {
                attributeName += code[i + j];
                j++;
            }
            code.splice(i+1, attributeName.length, '<span class="attribute-namePreset">'+attributeName+'</span>');
        }
    }
    return code;
}

function detectSpan(code, index) {
    if (code[index] === 's' && code[index+1] === 'p' && code[index+2] === 'a' && code[index+3] === 'n') {
        return true;
    }
    else if (code[index+1] === 's' && code[index+2] === 'p' && code[index+3] === 'a' && code[index+4] === 'n') {
        return true;
    }
    else {
        return false;
    }
}

function removeSpan(code) {
    for (let i = 0; i < code.length; i++) {
        if (code[i] === '<') {
            if (detectSpan(code, i+1) && code[i+1] !== '/') {
                if (code[i+13] === 'o') {
                    code.splice(i, 31);
                }

                else if (code[i+13] === 't') {
                    code.splice(i, 29);
                }

                else if (code[i+13] === 'a') {
                    code.splice(i, 35);
                }
            }

            else if (detectSpan(code, i+1) && code[i+1] === '/') {
                if (code[i+14] === 'o') {
                    code.splice(i, 32);
                }

                else if (code[i+14] === 't') {
                    code.splice(i, 30);
                }

                else if (code[i+14] === 'a') {
                    code.splice(i, 36);
                }
            }
        }
    }
    return code;
}

function changeColor(code) {
    for (let i = 0; i < code.length; i++) {
        if (code[i] === '<') {
            if (!detectSpan(code, i+1)) {
                code[i] = '<span class="open-closePreset">&lt;</span>';
            }
        }
        if (code[i] === '>') {
            if (!detectSpan(code, i+1)) {
                code[i] = '<span class="open-closePreset">&gt;</span>';
            }
        }
        if (code[i] === '/') {
            if (!detectSpan(code, i+1)) {
                code[i] = '<span class="open-closePreset">/</span>';
            }
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

function compileCode() {
    let characters = split(codeInput.innerHTML);
    let afterSpan = removeSpan(characters);
    console.log(afterSpan);
    let newCharacters = removeUnicode(afterSpan);
    let afterTags = getTags(newCharacters);
    let newChars = changeColor(afterTags);

    let newString = backToString(newChars);
    codeInput.innerHTML = newString;

    return newString;
}*/
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

function compileCode() {
    let textBox = codeInput.innerText;
    let characters = split(textBox);
    let removedUnicode = removeUnicode(characters);
    let addOpenClose = colorOpenClose(removedUnicode);
    //let addTagNames = colorTagName(addOpenClose);
    //let addAttributes = colorAttributes(addTagNames);
    let newCodeString = backToString(addOpenClose);//addAttributes);

    if (newCodeString[newCodeString.length - 1] !== textBox[textBox.length - 1]) {
        codeInput.innerHTML = newCodeString;
        placeCaretAtEnd(codeInput);
    }
    else if (firstTime === true) {
        codeInput.innerHTML = newCodeString;
        placeCaretAtEnd(codeInput);
        firstTime = false;
    }
}

compileCode();