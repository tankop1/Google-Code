let phoneInput = document.getElementById('phone-input');
let phoneSVG = document.getElementById('phone');
let tabletInput = document.getElementById('tablet-input');
let tabletSVG = document.getElementById('tablet');
let computerInput = document.getElementById('computer-input');
let computerSVG = document.getElementById('computer');
let previewContainer2 = document.getElementById('preview-container-2');

function phoneClicked() {
    if (phoneInput.checked) {
        phoneSVG.style.color = 'white';
        phoneSVG.style.fill = 'white';
        previewContainer2.style.width = '425px';
        previewContainer2.style.height = '700px';
    }

    else {
        phoneSVG.style.color = 'darkgrey';
        phoneSVG.style.fill = 'darkgrey';
    }
}

function tabletClicked() {
    if (tabletInput.checked) {
        tabletSVG.style.color = 'white';
        tabletSVG.style.fill = 'white';
        previewContainer2.style.width = '768px';
        previewContainer2.style.height = '800px';
    }

    else {
        tabletSVG.style.color = 'darkgrey';
        tabletSVG.style.fill = 'darkgrey';
    }
}

function computerClicked() {
    if (computerInput.checked) {
        computerSVG.style.color = 'white';
        computerSVG.style.fill = 'white';
        previewContainer2.style.width = '100%';
        previewContainer2.style.height = '100%';
    }

    else {
        computerSVG.style.color = 'darkgrey';
        computerSVG.style.fill = 'darkgrey';
    }
}

let previewTrial = document.getElementById('preview-trial');
let exit = document.getElementById('exit');

function findTitle() {
    let codeInputList = split(codeInput.innerText);
    let titleString = '';
    
    for (let i = 0; i < codeInputList.length; i++) {
        if (codeInputList[i] === '<' && codeInputList[i + 1] === 't' && codeInputList[i + 2] === 'i' && codeInputList[i + 3] === 't' && codeInputList[i + 4] === 'l' && codeInputList[i + 5] === 'e' && codeInputList[i + 6] === '>') {
            letter = i + 7;
            while (codeInputList[letter] !== '<') {
                titleString += codeInputList[letter];
                letter++;
            }
            break;
        }
    }
    return titleString;
}

function removeWhitespace(item) {
    itemList = split(item);
    for (let i = 0; i < itemList.length; i++) {
        if (itemList[i] === '{') {
            let j = i + 1;
            while (itemList[j] !== '}') {
                if (itemList[j] === ' ') {
                    itemList.splice(j, 1);
                }
                j++;
            }
        }
    }
    console.log(itemList);
    return backToString(itemList);
}

function showPreview() {
    previewTrial.style.display = 'flex';

    if (findTitle() !== '') {
        document.title = findTitle();
    }

    else {
        document.title = 'index.html';
    }

    previewContainer2.innerHTML = '<iframe id="preview-area"></iframe>';

    let frame = document.getElementById('preview-area').contentWindow.document;
    let htmlCode = codeInput.innerText;
    let cssCode = '<style>' + codeInputCSS.innerText + '</style>';
    let jsCode = '<script>' + codeInputJS.innerText + '</script>';

    frame.open();
    frame.write(htmlCode + cssCode + jsCode);
    frame.close();
}

exit.addEventListener('click', function () {
    previewTrial.style.display = 'none';
    document.title = workspaceTitle.innerText + ' - Google Code';
    refreshContainer.classList.remove('refreshing');
})

/*
THINGS LEFT TO DO:
1. Syntax highlighting
2. Autocomplete tags
3. Suggestions box
4. Undo and redo functionality
5. Git versioning
6. Preset layouts
7. Toolbar dropdown menus
8. Template page
9. Draggable tabs for layouts
10. Darkmode
11. Divider between tags
12. Terminal
13. Make hierarchy editable
14. Allow file renaming
15. Mobile compatibility
16. Database for storing code
*/

/*
CURRENT PROBLEMS:
1. Javascript only works when input box clicked before preview
2. 100% width or 100vh height is not correct in iframe
3. When the hierarchy item is clicked, the code resets
4. Favicon drag only works on light mode, NOT dark mode
*/