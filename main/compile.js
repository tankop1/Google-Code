/*function wrapLines (el){
	let text = el.innerText.split('\n');
    let newText = '<pre>';
    for (let i = 0; i < text.length; i++) {
        newText +='<span class="line">' + text[i] + '</span><br>';
    }
    console.log(newText + '</pre>');
    codeInput.innerHTML = newText + '</pre>';
    placeCaretAtEnd(codeInput);
}

function wrapLines (el){
	var text = el.textContent.split('\n');
	var range = document.createRange();
	var pointer = 0; // start of text
	el.textContent.split('\n').forEach(function(line, i){
		var len = line.length;
		setBounds (pointer, pointer+len); // sets range to the characters of the line
		var wrapper = document.createElement('span');
		wrapper.setAttribute('class', 'line');
		wrapper.appendChild(range.extractContents()); // pulls the contents of the range out of the document and into wrapper
		range.insertNode(wrapper); // and put back the wrapped line
		pointer += len+1; // skip the newline
	});
	// now, we're left with a bunch of empty spans/other elements that were split across lines and the browser divided them into three parts (first line, newline character, second line)
	// those mess up the odd/even calculations. Replace them with plain text.
	for (var node = el.firstChild; node; node = node.nextSibling){
		if (node.nodeType != 3 && node.getAttribute('class') != 'line'){
			var replacement = document.createTextNode(node.textContent);
			el.replaceChild(replacement, node);
			node = replacement;
		}
	}
	
	function setBounds (start, end){
		// since the browser throws an error if we try to move the beginning past the end (unlike IE, which just adusts the end)
		// we have to reset the range to cover the entire element, then move the start, then move the end to the start, then move the end
		range.selectNodeContents(el);
		moveBoundary (start, 'start');
		range.collapse (true);
		moveBoundary (end-start, 'end');
	}
	function moveBoundary (n, start){
		// move the boundary n characters forward, up to the end of the element. Forward only!
		//  start is 'start' or 'end', and is used to create the appropriate method names ('startContainer' or 'endContainer' etc.)
		// if the start is moved after the end, then an exception is raised
		if (n <= 0) return;
		var startNode = range[start+'Container'];
		// we may be starting somewhere into the text
		if (startNode.nodeType == 3) n += range[start+'Offset'];
		// nodeIterators from http://www.w3.org/TR/DOM-Level-2-Traversal-Range/traversal.html
		var iter = document.createNodeIterator(el, 4  SHOW_TEXT ), node;
		while (node = iter.nextNode()){
			if (startNode.compareDocumentPosition(node) & 2 DOCUMENT_POSITION_PRECEDING) continue;
			if (n <= node.nodeValue.length){
				// we found the last character!
				range[start == 'start' ? 'setStart' :'setEnd'](node, n);
				return;
			} else{
				n -= node.nodeValue.length; // eat these characters
			}
		}
	}
}
*/

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

/*placeCaretAtEnd(codeInput);
let lineYStart = getCaretCoordinates()[1];
console.log(lineYStart);*/

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

/* DIVIDER */

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
    let addTagNames = colorTagName(addOpenClose);
    let addAttributes = colorAttributes(addTagNames);
    let newCodeString = backToString(addAttributes);

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

codeInput.addEventListener('click', function () {
    //console.log('Hello world!');
    //compileCode();
});