// ------------- WORKSPACE TITLE JAVASCRIPT --------------

let workspaceTitle = document.getElementById('workspace-title');

// Function for selecting / highlighting text
function selectElementContents(el) {
    var range = document.createRange();
    range.selectNodeContents(el);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
}

// Listens for click out of title input
document.addEventListener('click', function(event) {
    var isClickInsideElement = workspaceTitle.contains(event.target);
    if (!isClickInsideElement) {

        workspaceTitle.style.border = 'none';

        if (workspaceTitle.innerText === '' || workspaceTitle.innerText === 'Untitled file') {
            workspaceTitle.innerText = 'Untitled file';
            workspaceTitle.style.color = 'rgb(120, 120, 120)';
            document.title = workspaceTitle.innerText + ' - Google Code';
        }

        else {
            document.title = workspaceTitle.innerText + ' - Google Code';
        }

        workspaceTitle.style.padding = '1px 6px';
    }
});

// Selects title / adds border on click
workspaceTitle.addEventListener('click', function () {
    workspaceTitle.style.border = '2px solid #FF914D';
    workspaceTitle.style.padding = '1px 4px';
    selectElementContents(workspaceTitle);
});

// Detirmines text color on input
workspaceTitle.addEventListener('input', function () {
    if (workspaceTitle.innerText === 'Untitled file') {
        workspaceTitle.style.color = 'rgb(125, 125, 125)';
    }
    else {
        workspaceTitle.style.color = 'black';
    }
});

// Prevents line breaks / handles pressing "enter"
workspaceTitle.addEventListener('keydown', (evt) => {
    if (evt.keyCode === 13) {
        evt.preventDefault();
        workspaceTitle.style.border = 'none';

        if (workspaceTitle.innerText === '' || workspaceTitle.innerText === 'Untitled file') {
            workspaceTitle.innerText = 'Untitled file';
            workspaceTitle.style.color = 'rgb(120, 120, 120)';
            document.title = workspaceTitle.innerText + ' - Google Code';
        }

        else {
            document.title = workspaceTitle.innerText + ' - Google Code';
        }

        workspaceTitle.style.padding = '1px 6px';

        // Removes highlight selection from title
        if (window.getSelection) {
            if (window.getSelection().empty) {  // Chrome
                window.getSelection().empty();
            } else if (window.getSelection().removeAllRanges) {  // Firefox
                window.getSelection().removeAllRanges();
            }
        } else if (document.selection) {  // IE?
            document.selection.empty();
        }
    }
});


// ----------------- STAR ICON JAVASCRIPT -------------------

let starIcon = document.getElementById('star-icon');

// Returns true if item in list
function inList(item, lst) {
    for (let i = 0; i < lst.length; i++) {
        if (lst[i] === item) {
            return true;
        }
    }
    return false;
}

starIcon.addEventListener('click', function () {

    if (inList('far', starIcon.classList)) {
        starIcon.classList.remove('far');
        starIcon.classList.add('fas');
        starIcon.style.color = '#FFC20B';
    }

    else {
        starIcon.style.color = 'rgb(95, 95, 95)';
        starIcon.classList.remove('fas');
        starIcon.classList.add('far');
    }
});

// -------------- TERMINAL UP / DOWN -----------------

let terminalContainer = document.getElementById('terminal-container');
let terminalButton = document.getElementById('preview-inpage-container');
let control = true;

terminalButton.addEventListener('click', function () {

    if (control) {
        terminalContainer.classList.remove('terminal-down');
        terminalButton.classList.remove('button-down');
        terminalContainer.classList.add('terminal-up');
        terminalButton.classList.add('button-up');
        control = false;
    }

    else {
        terminalContainer.classList.remove('terminal-up');
        terminalButton.classList.remove('button-up');
        terminalContainer.classList.add('terminal-down');
        terminalButton.classList.add('button-down');
        control = true;
    }
});