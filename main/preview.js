let phoneInput = document.getElementById('phone-input');
let phoneSVG = document.getElementById('phone');
let tabletInput = document.getElementById('tablet-input');
let tabletSVG = document.getElementById('tablet');
let computerInput = document.getElementById('computer-input');
let computerSVG = document.getElementById('computer');
let previewContainer = document.getElementById('preview-container');

function phoneClicked() {
    if (phoneInput.checked) {
        phoneSVG.style.color = 'white';
        phoneSVG.style.fill = 'white';
        previewContainer.style.width = '425px';
        previewContainer.style.height = '700px';
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
        previewContainer.style.width = '768px';
        previewContainer.style.height = '600px';
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
        previewContainer.style.width = '100%';
        previewContainer.style.height = '100%';
    }

    else {
        computerSVG.style.color = 'darkgrey';
        computerSVG.style.fill = 'darkgrey';
    }
}

function showPreview() {
    let frame = document.getElementById('preview-area').contentWindow.document;
    frame.open();
    frame.write('<h1 style="color: red;">Hello World!</h1>');
    frame.close();
}

showPreview();