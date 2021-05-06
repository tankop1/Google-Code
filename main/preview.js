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

function listToString(lst) {
    let newStringForList = '';

    for (let i = 0; i < lst.length; i++) {
        newStringForList += lst[i]
    }

    return newStringForList;
}

let iconLinks = document.querySelectorAll('.links');
let oldRels = [];
let mainFavicon = document.getElementById('main-favicon');

function newFavicon() {
    oldRels = [];
    for (let i = 0; i < iconLinks.length; i++) {
        oldRels.push(iconLinks[i].href);
        iconLinks[i].href = 'none';
    }
    mainFavicon.href = faviconLinkCode;
}

function replaceFavicon() {
    for (let i = 0; i < iconLinks.length; i++) {
        iconLinks[i].href = oldRels[i];
    }
}

function showPreview() {
    previewTrial.style.display = 'flex';

    if (findTitle() !== '') {
        document.title = findTitle();
    }

    else {
        document.title = 'index.html';
    }

    previewContainer2.innerHTML = '<iframe id="preview-area"></iframe>'; // Takes away all previously written code

    let previewCode = [];
    let editors = [editor, editorCSS, editorJS];

    for (let i = 0; i < editorTypes.length; i++) {
        if (editorTypes[i] === 'html') {
            previewCode.push(editors[i].getValue());
        }

        else if (editorTypes[i] === 'css') {
            previewCode.push('<style>' + editors[i].getValue() + '</style>');
        }

        else if (editorTypes[i] === 'javascript') {
            previewCode.push('<script>' + editors[i].getValue() + '</script>');
        }

        else if (editorTypes[i] === 'deleted') {
        }

        else {
            console.log('ERROR PREVIEWING CODE - Filetype: ' +  editorTypes[i]);
        }
    }

    let frame = document.getElementById('preview-area').contentWindow.document;
    /*let htmlCode = editor.getValue();
    let cssCode = '<style>' + editorCSS.getValue() + '</style>';
    let jsCode = '<script>' + editorJS.getValue() + '</script>';*/
    let extraStyle = `<style>
    body {
        background-color: white;
        font-family: Arial, Helvetica, sans-serif;
    }
    </style>`;
    newFavicon();

    frame.open();
    frame.write(extraStyle + listToString(previewCode));
    frame.close();
}

exit.addEventListener('click', function () {
    previewTrial.style.display = 'none';
    document.title = workspaceTitle.innerText + ' - Google Code';
    refreshContainer.classList.remove('refreshing');
    replaceFavicon();
})

/*
THINGS LEFT TO DO:
1. Syntax highlighting - DONE
2. Autocomplete tags
3. Suggestions box
4. Undo and redo functionality
5. Git versioning
6. Preset layouts - DONE
7. Toolbar dropdown menus - DONE
8. Template page - DONE
9. Draggable tabs for layouts
10. Darkmode - DONE
11. Divider between tags
12. Terminal
13. Make hierarchy editable
14. Allow file renaming - DONE
15. Mobile compatibility
16. Database for storing code
17. Change code font size (view dropdown)
*/

/*
CURRENT PROBLEMS:
1. Javascript only works when input box clicked before preview - FIXED
2. 100% width or 100vh height is not correct in iframe - FIXED
3. When the hierarchy item is clicked, the code resets - FIXED
4. Favicon drag only works on light mode, NOT dark mode - TOOK AWAY FAVICON DRAG (NOW JUST USES THE UPLOADED FAVICON INSTEAD OF REQUIRING THE USER TO PUT THE LINK IN THEIR CODE)
5. Favicon drag code is WAY too long
6. Rightmost tooltips are behind the right nav - FIXED
7. Left most dropdown (file) is behind code editor
*/