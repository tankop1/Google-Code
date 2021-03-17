// ------------- WORKSPACE TITLE JAVASCRIPT --------------

let workspaceTitle = document.getElementById('workspace-title');
let projectItem = document.getElementById('project-folder');

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

        if (workspaceTitle.innerText === '' || workspaceTitle.innerText === 'Untitled project') {
            workspaceTitle.innerText = 'Untitled project';
            workspaceTitle.style.color = 'rgb(120, 120, 120)';
            document.title = workspaceTitle.innerText + ' - Google Code';
            projectItem.innerText = workspaceTitle.innerText;
        }

        else {
            document.title = workspaceTitle.innerText + ' - Google Code';
            projectItem.innerText = workspaceTitle.innerText;
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
    if (workspaceTitle.innerText === 'Untitled project') {
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

        if (workspaceTitle.innerText === '' || workspaceTitle.innerText === 'Untitled project') {
            workspaceTitle.innerText = 'Untitled project';
            workspaceTitle.style.color = 'rgb(120, 120, 120)';
            document.title = workspaceTitle.innerText + ' - Google Code';
            projectItem.innerText = workspaceTitle.innerText;
        }

        else {
            document.title = workspaceTitle.innerText + ' - Google Code';
            projectItem.innerText = workspaceTitle.innerText;
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

// ------------------- PREVIEW BUTTON ---------------------

let previewContainer = document.getElementById('preview-container');

previewContainer.addEventListener('click', function () {
    window.location.href = "preview.html";
});

// ------------------ CODE INPUT BOX ---------------------

let codeInput = document.getElementById('code-input');

codeInput.addEventListener('keydown', function(e) {
    if (e.key == 'Tab') {
      e.preventDefault();
      var start = this.selectionStart;
      var end = this.selectionEnd;
  
      // set textarea value to: text before caret + tab + text after caret
      this.value = this.value.substring(0, start) +
        "\t" + this.value.substring(end);
  
      // put caret at right position again
      this.selectionStart =
        this.selectionEnd = start + 1;
    }
}); // This function was taken from www.stackoverflow.com


// ----------------- RIGHT NAVIGATION TABS -----------------

let hierarchyTab = document.getElementById('hierarchy-tab');
let presetsTab = document.getElementById('presets-tab');
let hierarchyUnderline = document.getElementById('hierarchy-underline');
let presetsUnderline = document.getElementById('presets-underline');

function hierarchyClicked() {
    hierarchyTab.style.color = '#FF914D';
    hierarchyUnderline.style.backgroundColor = '#FF914D';
    presetsTab.style.color = 'rgb(95, 95, 95)';
    presetsUnderline.style.backgroundColor = 'white';
}

function presetsClicked() {
    hierarchyTab.style.color = 'rgb(95, 95, 95)';
    hierarchyUnderline.style.backgroundColor = 'white';
    presetsTab.style.color = '#FF914D';
    presetsUnderline.style.backgroundColor = '#FF914D';
}


// ----------------- HIERARCHY TREE COLLAPSE -------------------

let carrots = document.querySelectorAll('.fa-chevron-down');
let folderContents = document.querySelectorAll('.folder-contents-container');
/*let carrotsUp = document.querySelectorAll('.fa-chevron-up');
let carrots = carrotsDown + carrotsUp;*/

function inArray(item, array) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === item) {
            return true;
        }
    }
    return false;
}

console.log(carrots);

for (let i = 0; i < carrots.length; i++) {
    carrots[i].addEventListener('click', function () {
        if (inArray('fa-chevron-down', carrots[i].classList)) {
            carrots[i].classList.remove('fa-chevron-down');
            carrots[i].classList.add('fa-chevron-up');
            folderContents[i].style.display = 'none';
        }
        else {
            carrots[i].classList.remove('fa-chevron-up');
            carrots[i].classList.add('fa-chevron-down');
            folderContents[i].style.display = 'block';
        }
    });
}


// ---------------- HIERARCHY ITEM CLICK ------------------
let indexTab = document.getElementById('index-tab');
let styleTab = document.getElementById('style-tab');
let appTab = document.getElementById('app-tab');
let indexItem = document.getElementById('index-item');
let styleItem = document.getElementById('style-item');
let appItem = document.getElementById('app-item');

indexItem.addEventListener('click', function () {
    indexTab.style.display = 'flex';
});

styleItem.addEventListener('click', function () {
    styleTab.style.display = 'flex';
});

appItem.addEventListener('click', function () {
    appTab.style.display = 'flex';
});


// ------------------ TAB FUNCTIONALITY -------------------

let tabs = document.querySelectorAll('.tab-container');
let tabExits = document.querySelectorAll('.tab-exit');

for (let i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener('click', function (e) {
        if (!inArray('tab-exit', e.target.classList)) {
            for (let j = 0; j < tabExits.length; j++) {
                if (j !== i) {
                    tabs[j].classList.remove('tab-selected');
                }
            }
            tabs[i].classList.add('tab-selected');
        }
    });
}

for (let i = 0; i < tabExits.length; i++) {
    tabExits[i].addEventListener('click', function () {
        tabs[i].style.display = 'none';
        if (inArray('tab-selected', tabs[i].classList)) {
            tabs[i].classList.remove('tab-selected');
            if (tabs[tabs.length - 1].style.display !== 'none') {
                tabs[tabs.length - 1].classList.add('tab-selected');
            }
            else if (tabs[tabs.length - 2].style.display !== 'none') {
                tabs[tabs.length - 2].classList.add('tab-selected');
            }
            else {
                tabs[tabs.length - 3].classList.add('tab-selected');
            }
        }
    });
}