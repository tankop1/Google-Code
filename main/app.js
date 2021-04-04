let darkModeOn = false;

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
} // This function was taken from www.stackoverflow.com

// Listens for click out of title input
document.addEventListener('click', function(event) {
    let isClickInsideElement = workspaceTitle.contains(event.target);
    if (!isClickInsideElement) {

        workspaceTitle.style.border = 'none';

        if (!previewContainer.contains(event.target) && !previewTrial.contains(event.target)) {
            if (workspaceTitle.innerText === '' || workspaceTitle.innerText === 'Untitled project') {
                workspaceTitle.innerText = 'Untitled project';
                workspaceTitle.style.color = 'rgb(120, 120, 120)';
                document.title = workspaceTitle.innerText + ' - Google Code';
                projectItem.innerText = workspaceTitle.innerText;
            }
    
            else {
                if (darkModeOn) {
                    workspaceTitle.style.color = 'white';
                }
                document.title = workspaceTitle.innerText + ' - Google Code';
                projectItem.innerText = workspaceTitle.innerText;
            }
    
            workspaceTitle.style.padding = '1px 6px';
        }
    }

    if (!suggestionBox.contains(event.target)) {
        suggestionBox.style.display = 'none';
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
        if (darkModeOn) {
            workspaceTitle.style.color = 'white';
        }
        else {
            workspaceTitle.style.color = 'black';
        }
    }
});

// Prevents line breaks / handles pressing "enter"
workspaceTitle.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        e.preventDefault();
        workspaceTitle.style.border = 'none';

        if (workspaceTitle.innerText === '' || workspaceTitle.innerText === 'Untitled project') {
            workspaceTitle.innerText = 'Untitled project';
            workspaceTitle.style.color = 'rgb(120, 120, 120)';
            document.title = workspaceTitle.innerText + ' - Google Code';
            projectItem.innerText = workspaceTitle.innerText;
        }

        else {
            if (darkModeOn) {
                workspaceTitle.style.color = 'white';
            }
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
        } // This statement was taken from www.stackoverflow.com
    }
});


// ----------------- STAR ICON JAVASCRIPT -------------------

let starIcon = document.getElementById('star-icon');
let starIconContainer = document.getElementById('star-icon-container');

// Returns true if item in list
function inList(item, lst) {
    for (let i = 0; i < lst.length; i++) {
        if (lst[i] === item) {
            return true;
        }
    }
    return false;
}

starIconContainer.addEventListener('click', function () {

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
let terminalIcon = document.getElementById('preview-inpage');
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
    showPreview();
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
let hierarchyContents = document.getElementById('hierarchy-tab-contents');
let presetsContents = document.getElementById('presets-tab-contents');
let presetsActive = false;

function hierarchyClicked() {
    hierarchyTab.style.color = '#FF914D';
    hierarchyUnderline.style.backgroundColor = '#FF914D';
    presetsUnderline.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    presetsContents.style.display = 'none';
    hierarchyContents.style.display = 'block';

    if (darkModeOn) {
        presetsTab.style.color = 'rgb(200, 200, 200)';
    }
    else {
        presetsTab.style.color = 'rgb(95, 95, 95)';
    }
    presetsActive = false;
}

function presetsClicked() {
    hierarchyUnderline.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    presetsTab.style.color = '#FF914D';
    presetsUnderline.style.backgroundColor = '#FF914D';
    presetsContents.style.display = 'block';
    hierarchyContents.style.display = 'none';

    if (darkModeOn) {
        hierarchyTab.style.color = 'rgb(200, 200, 200)';
    }
    else {
        hierarchyTab.style.color = 'rgb(95, 95, 95)';
    }
    presetsActive = true;
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
let body = document.querySelector('body');
let tabs = document.querySelectorAll('.tab-container');

function noneToTabs(thisTab) {
    codeInput.innerHTML = '';
    codeInput.innerText = currentTextBeforeClose;
    codeInput.style.display = 'block'; //NEED SOMETHING HERE
    codeInput.style.justifyContent = 'none';
    codeInput.style.alignItems = 'none';
    codeInput.contentEditable = 'true';

    if (darkModeOn) {
        codeInput.style.backgroundColor = 'rgb(95, 95, 95)';
        body.style.backgroundColor = 'rgb(95, 95, 95)';
        tabsContainer.style.backgroundColor = 'rgb(130, 130, 130)';
    }
    
    else {
        codeInput.style.backgroundColor = 'rgb(245, 245, 245)';
        body.style.backgroundColor = 'rgb(245, 245, 245)';
    }
    //compileCode();

    for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('tab-selected');
        tabs[i].classList.remove('tab-selected-darkmode');
    }

    if (darkModeOn) {
        thisTab.classList.add('tab-selected-darkmode');
    }

    else {
        thisTab.classList.add('tab-selected');
    }
}

indexItem.addEventListener('click', function () {
    indexTab.style.display = 'flex';
    noneToTabs(indexTab);
    changeCurrentTab(codeInput);
});

styleItem.addEventListener('click', function () {
    styleTab.style.display = 'flex';
    noneToTabs(styleTab);
    changeCurrentTab(codeInputCSS);
});

appItem.addEventListener('click', function () {
    appTab.style.display = 'flex';
    noneToTabs(appTab);
    changeCurrentTab(codeInputJS);
});


// ------------------ TAB FUNCTIONALITY -------------------

function changeCurrentTab(tab) {
    codeInput.style.display = 'none';
    codeInputCSS.style.display = 'none';
    codeInputJS.style.display = 'none';
    tab.style.display = 'block';
}

let tabExits = document.querySelectorAll('.tab-exit');
let currentTextBeforeClose = codeInput.innerText;

for (let i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener('click', function (e) {
        if (!inArray('tab-exit', e.target.classList)) {
            for (let j = 0; j < tabExits.length; j++) {
                if (j !== i) {
                    tabs[j].classList.remove('tab-selected');
                    tabs[j].classList.remove('tab-selected-darkmode');
                }
            }
            if (darkModeOn) {
                tabs[i].classList.add('tab-selected-darkmode');
            }
            else {
                tabs[i].classList.add('tab-selected');
            }
        }
    });
}

for (let i = 0; i < tabExits.length; i++) {
    tabExits[i].addEventListener('click', function () {
        tabs[i].style.display = 'none';
        if (darkModeOn) {
            if (inArray('tab-selected-darkmode', tabs[i].classList)) {
                tabs[i].classList.remove('tab-selected-darkmode');
                if (tabs[tabs.length - 1].style.display !== 'none') {
                    tabs[tabs.length - 1].classList.add('tab-selected-darkmode');
                    changeCurrentTab(codeInputJS);
                }
                else if (tabs[tabs.length - 2].style.display !== 'none') {
                    tabs[tabs.length - 2].classList.add('tab-selected-darkmode');
                    changeCurrentTab(codeInputCSS);
                }
                else if (tabs[tabs.length - 3].style.display !== 'none') {
                    tabs[tabs.length - 3].classList.add('tab-selected-darkmode');
                    changeCurrentTab(codeInput);
                }
                else {
                    allTabsClosed();
                }
            }
        }
        else {
            if (inArray('tab-selected', tabs[i].classList)) {
                tabs[i].classList.remove('tab-selected');
                if (tabs[tabs.length - 1].style.display !== 'none') {
                    tabs[tabs.length - 1].classList.add('tab-selected');
                    changeCurrentTab(codeInputJS);
                }
                else if (tabs[tabs.length - 2].style.display !== 'none') {
                    tabs[tabs.length - 2].classList.add('tab-selected');
                    changeCurrentTab(codeInputCSS);
                }
                else if (tabs[tabs.length - 3].style.display !== 'none') {
                    tabs[tabs.length - 3].classList.add('tab-selected');
                    changeCurrentTab(codeInput);
                }
                else {
                    allTabsClosed();
                }
            }
        }
    });
}

let codeInputCSS = document.getElementById('code-input-css');
let codeInputJS = document.getElementById('code-input-js');
let indexExit = document.getElementById('index-exit');
let styleExit = document.getElementById('style-exit');
let appExit = document.getElementById('app-exit');

indexTab.addEventListener('click', function (e) {
    let clickInIndexTab = indexExit.contains(e.target);
    if (!clickInIndexTab) {
        changeCurrentTab(codeInput);
    }
});

styleTab.addEventListener('click', function (e) {
    let clickInStyleTab = styleExit.contains(e.target);
    if (!clickInStyleTab) {
        changeCurrentTab(codeInputCSS);
    }
});

appTab.addEventListener('click', function (e) {
    let clickInAppTab = appExit.contains(e.target);
    if (!clickInAppTab) {
        changeCurrentTab(codeInputJS);
    }
});

function allTabsClosed() {
    currentTextBeforeClose = codeInput.innerText;
    codeInput.style.backgroundColor = 'rgb(220, 220, 220)';
    codeInput.innerText = '';
    codeInput.innerHTML = '<img src="assets/google-code-logo-grayscale.png" alt="Greyscale Logo" id="greyscale-logo">';
    codeInput.style.display = 'flex';
    codeInputCSS.style.display = 'none';
    codeInputJS.style.display = 'none';
    codeInput.style.justifyContent = 'center';
    codeInput.style.alignItems = 'center';
    codeInput.contentEditable = 'false';
    if (darkModeOn) {
        body.style.backgroundColor = 'rgb(120, 120, 120)';
        codeInput.style.backgroundColor = 'rgb(120, 120, 120)';
        tabsContainer.style.backgroundColor = 'rgb(120, 120, 120)';
    }
    else {
        body.style.backgroundColor = 'rgb(220, 220, 220)';
        codeInput.style.backgroundColor = 'rgb(220, 220, 220)';
    }
}

// --------------- FAVICON PRESET FUNCTIONALITY ----------------

let fileLinks = [];
let previewSRC = '';

function previewFile() {
    let preview = document.getElementById('favicon-img-display-img');
    let file = document.getElementById('favicon-file').files[0];
    let reader = new FileReader();
  
    reader.onloadend = function () {
        changeStyle();
        fileLinks.push(reader.result);
        preview.src = reader.result;
        previewSRC = reader.result;
    }
  
    if (file) {
        reader.readAsDataURL(file);
    } else {
        preview.src = "";
    }
} // This function was taken from www.stackoverflow.com

function split(code) {
    let chars = [];
    for (let i = 0; i < code.length; i++) {
        chars.push(code[i]);
    }
    return chars;
}

function changeStyle() {
    let imgPreviewContainer = document.getElementById('favicon-img-display');
    let preview = document.getElementById('favicon-img-display-img');
    let defaultText = document.getElementById('favicon-default-text');
    let faviconFilename = document.getElementById('favicon-filename');

    imgPreviewContainer.style.border = 'none';
    preview.style.display = 'block';
    defaultText.style.display = 'none';
    faviconFilename.innerHTML = 'Drag to code';
    faviconFilename.style.color = 'green';
}

// ------------------ PREVIEW REFRESH --------------------

let refreshContainer = document.getElementById('refresh-container');

refreshContainer.addEventListener('click', function () {
    refreshContainer.classList.add('refreshing');
    showPreview();
});

refreshContainer.addEventListener('mouseenter', function () {
    refreshContainer.classList.remove('refreshing');
});

// ---------------- DRAGGABLE PRESETS ------------------

let previewDisplayImg = document.getElementById('favicon-img-display-img');
let draggableActive = false;

draggableMouseDown(previewDisplayImg, '&lt;link type="icon" src="#"&gt;');

function draggableMouseDown(object, replacement) {

    function moveCode(e) {
        let x = e.clientX;
        let y = e.clientY;

        object.style.left = (x - 30) + 'px';
        object.style.top = (y - 30) + 'px';
    }

    object.addEventListener('mousedown', function () {
        object.style.cursor = 'grabbing';
        body.style.cursor = 'grabbing';
        object.style.position = 'fixed';
        object.style.left = '1284px';
        object.style.top = '221px';
        draggableActive = true;
        document.addEventListener('mousemove', moveCode);
    });

    document.addEventListener('mouseup', function (e) {
        body.style.cursor = 'initial';
        object.style.cursor = 'grab';
        object.style.position = 'initial';
        if (e.clientX < 1251 && e.clientY > 103 && draggableActive && inArray('tab-selected', indexTab.classList)) {
            let oldTextCode = codeInput.innerText;
            codeInput.innerText = oldTextCode + '<link rel="icon" type="image/png" sizes="32x32" href="' + previewSRC + '">';
        }
        draggableActive = false;
        document.removeEventListener('mousemove', moveCode);
    });
}

// ------------------ TOGGLE DARK MODE --------------------

let darkModeButton = document.getElementById('comment-container');
let tabTitles = document.querySelectorAll('.tab-title');
let tabsContainer = document.getElementById('tabs');
let header = document.querySelector('header');
let divider = document.querySelector('.divider');
let comment = document.getElementById('comment');
let gitVersion = document.getElementById('collab-history');
let preview = document.getElementById('preview');
let undo = document.getElementById('undo');
let redo = document.getElementById('redo');
let rightNav = document.getElementById('right-nav');
let terminalInput = document.getElementById('terminal-input');
let navButtons = document.querySelectorAll('.nav-button');
let versionHistoryLink = document.getElementById('version-history-link');
let folderIcon = document.getElementById('folder-icon');
let cloudIcon = document.getElementById('cloud-icon');
let savedMessage = document.getElementById('saved-message');
let folderContainer = document.querySelector('.folder-container');
let folderIconContainer = document.getElementById('folder-icon-container');
let cloudContainer = document.getElementById('cloud-icon-container');
let hierarchyTree = document.getElementById('hierarchy-tree');
let faviconPresetTitle = document.getElementById('favicon-preset-title');
let faviconFilename = document.getElementById('favicon-filename');
let faviconPreview = document.getElementById('favicon-img-display');
let controlTitles = document.querySelectorAll('.control-title');
let topNavDividers = document.querySelectorAll('.top-nav-divider-line');
let layoutIcon = document.getElementById('layout-icon');
let layoutTitle = document.getElementById('layout-title');

darkModeButton.addEventListener('click', function () {
    if (codeInput.style.color !== 'white') {
        darkModeButton.style.backgroundColor = 'rgb(95, 95, 95)';
        toDarkMode();
    }

    else {
        toLightMode();
    }
});

function toDarkIcons() {

    let icons = [comment, gitVersion, preview, undo, redo, fileButton, editButton, viewButton, toolButton, helpButton, starIcon, folderIcon, cloudIcon];
    let iconContainers = [document.getElementById('comment-container'), document.getElementById('collab-history-container'), document.getElementById('preview-container'), document.getElementById('undo-container'), document.getElementById('redo-container'), fileButton, editButton, viewButton, toolButton, helpButton, starIconContainer, folderIconContainer, cloudContainer];

    for (let i = 0; i < icons.length; i++) {
        icons[i].style.color = 'rgb(240, 240, 240)';
        icons[i].style.fill = 'rgb(240, 240, 240)';
        iconContainers[i].addEventListener('mouseenter', function () {
            iconContainers[i].style.backgroundColor = 'rgb(95, 95, 95)';
        });
        iconContainers[i].addEventListener('mouseleave', function () {
            iconContainers[i].style.backgroundColor = 'rgba(95, 95, 95, 0)';
        });
        darkModeButton.addEventListener('click', function () {
            darkModeButton.style.backgroundColor = 'rgb(240, 240, 240)';
        });
    }
}

function toLightIcons() {

    let icons = [comment, gitVersion, preview, undo, redo, fileButton, editButton, viewButton, toolButton, helpButton, starIcon, folderIcon, cloudIcon];
    let iconContainers = [document.getElementById('comment-container'), document.getElementById('collab-history-container'), document.getElementById('preview-container'), document.getElementById('undo-container'), document.getElementById('redo-container'),  fileButton, editButton, viewButton, toolButton, helpButton, starIconContainer, folderIconContainer, cloudContainer];

    for (let i = 0; i < icons.length; i++) {
        icons[i].style.color = 'rgb(95, 95, 95)';
        icons[i].style.fill = 'rgb(95, 95, 95)';
        iconContainers[i].addEventListener('mouseenter', function () {
            iconContainers[i].style.backgroundColor = 'rgb(240, 240, 240)';
        });
        iconContainers[i].addEventListener('mouseleave', function () {
            iconContainers[i].style.backgroundColor = 'rgba(240, 240, 240, 0)';
        });
        darkModeButton.addEventListener('click', function () {
            darkModeButton.style.backgroundColor = 'rgb(95, 95, 95)';
        });
    }
}

function toDarkMode() {
    let selectedTab = document.querySelector('.tab-selected');
    darkModeOn = true;

    codeInput.style.backgroundColor = 'rgb(95, 95, 95)';
    codeInput.style.color = 'white';
    codeInputCSS.style.backgroundColor = 'rgb(95, 95, 95)';
    codeInputCSS.style.color = 'white';
    codeInputJS.style.backgroundColor = 'rgb(95, 95, 95)';
    codeInputJS.style.color = 'white';
    //selectedTab.style.backgroundColor = 'rgb(95, 95, 95)';
    body.style.backgroundColor = 'rgb(95, 95, 95)';
    tabsContainer.style.backgroundColor = 'rgb(130, 130, 130)';
    terminalIcon.style.color = 'rgb(240, 240, 240)';
    terminalButton.style.boxShadow = '0.5px 0.5px 3px rgb(150, 150, 150)';
    suggestionBox.style.backgroundColor = 'rgb(150, 150, 150)';
    suggestionBox.style.border = '1px solid rgb(235, 235, 235)';
    header.style.backgroundColor = 'rgb(75, 75, 75)';
    header.style.color = 'white';
    divider.style.backgroundColor = 'rgb(110, 110, 110)';
    rightNav.style.borderLeft = '1px solid rgb(110, 110, 110)';
    topNavDividers[0].style.border = '.5px solid rgb(110, 110, 110)';
    topNavDividers[1].style.border = '.5px solid rgb(110, 110, 110)';
    topNavDividers[2].style.border = '.5px solid rgb(110, 110, 110)';
    toDarkIcons();
    rightNav.style.backgroundColor = 'rgb(75, 75, 75)';
    terminalContainer.style.backgroundColor = 'rgb(75, 75, 75)';
    terminalInput.style.backgroundColor = 'rgb(85, 85, 85)';
    terminalInput.style.color = 'white';
    versionHistoryLink.style.color = 'white';
    workspaceTitle.style.color = 'white';
    starIcon.style.color = 'white';
    folderIcon.style.color = 'white';
    cloudIcon.style.color = 'white';
    savedMessage.style.color = 'white';
    folderContainer.style.backgroundColor = 'rgb(95, 95, 95)';
    hierarchyTree.style.color = 'white';
    faviconPresetTitle.style.color = 'white';
    faviconFilename.style.color = 'white';
    faviconPreview.style.color = 'rgb(95, 95, 95)';
    faviconPreview.style.border = '2px solid rgb(95, 95, 95)';
    layoutIcon.style.fill = 'white';
    layoutTitle.style.color = 'white';

    if (presetsActive) {
        hierarchyTab.style.color = 'rgb(200, 200, 200)';
    }
    else {
        presetsTab.style.color = 'rgb(200, 200, 200)';
    }

    darkModeButton.title = 'Light Mode';

    for (let i = 0; i < tabs.length; i++) {
        tabs[i].style.backgroundColor = 'rgb(110, 110, 110)';
        tabTitles[i].style.color = 'white';
        tabExits[i].style.color = 'white';

        if (inArray('tab-selected', tabs[i].classList)) {
            tabs[i].classList.remove('tab-selected');
            tabs[i].classList.add('tab-selected-darkmode');
        }
    }

    for (let i = 0; i < navButtons.length; i++) {
        navButtons[i].style.backgroundColor = 'rgb(75, 75, 75)';
        navButtons[i].style.color = 'white';
    }

    for (let i = 0; i < controlTitles.length; i++) {
        controlTitles[i].style.color = 'white';
    }
}

function toLightMode() {
    let selectedTab = document.querySelector('.tab-selected');
    darkModeOn = false;

    codeInput.style.backgroundColor = 'rgb(245, 245, 245)';
    codeInput.style.color = 'black';
    codeInputCSS.style.backgroundColor = 'rgb(245, 245, 245)';
    codeInputCSS.style.color = 'black';
    codeInputJS.style.backgroundColor = 'rgb(245, 245, 245)';
    codeInputJS.style.color = 'black';
    //selectedTab.style.backgroundColor = 'rgb(245, 245, 245)';
    body.style.backgroundColor = 'rgb(245, 245, 245)';
    tabsContainer.style.backgroundColor = 'rgb(220, 220, 220)';
    terminalIcon.style.color = 'rgb(95, 95, 95)';
    terminalButton.style.boxShadow = '0.5px 0.5px 2px rgb(177, 177, 177)';
    suggestionBox.style.backgroundColor = 'white';
    suggestionBox.style.border = '1px solid rgb(95, 95, 95)';
    header.style.backgroundColor = 'white';
    header.style.color = 'rgb(95, 95, 95)';
    divider.style.backgroundColor = 'lightgrey';
    rightNav.style.borderLeft = '1px solid rgb(199, 199, 199)';
    topNavDividers[0].style.border = '.5px solid rgb(199, 199, 199)';
    topNavDividers[1].style.border = '.5px solid rgb(199, 199, 199)';
    topNavDividers[2].style.border = '.5px solid rgb(199, 199, 199)';
    toLightIcons();
    rightNav.style.backgroundColor = 'white';
    terminalContainer.style.backgroundColor = 'white';
    terminalInput.style.backgroundColor = 'rgb(245, 245, 245)';
    terminalInput.style.color = 'black';
    versionHistoryLink.style.color = 'rgb(95, 95, 95)';
    workspaceTitle.style.color = 'black';
    starIcon.style.color = 'rgb(95, 95, 95)';
    folderIcon.style.color = 'rgb(95, 95, 95)';
    cloudIcon.style.color = 'rgb(95, 95, 95)';
    savedMessage.style.color = 'rgb(95, 95, 95)';
    folderContainer.style.backgroundColor = 'rgb(240, 240, 240)';
    hierarchyTree.style.color = 'rgb(95, 95, 95)';
    faviconPresetTitle.style.color = 'rgb(95, 95, 95)';
    faviconFilename.style.color = 'rgb(95, 95, 95)';
    faviconPreview.style.color = 'rgb(220, 220, 220)';
    faviconPreview.style.border = '2px solid rgb(220, 220, 220)';
    layoutIcon.style.fill = 'rgb(95, 95, 95)';
    layoutTitle.style.color = 'rgb(95, 95, 95)';

    if (presetsActive) {
        hierarchyTab.style.color = 'rgb(95, 95, 95)';
    }
    else {
        presetsTab.style.color = 'rgb(95, 95, 95)';
    }

    darkModeButton.title = 'Dark Mode';

    for (let i = 0; i < tabs.length; i++) {
        tabs[i].style.backgroundColor = 'rgb(230, 230, 230)';
        tabTitles[i].style.color = 'rgb(95, 95, 95)';
        tabExits[i].style.color = 'rgb(95, 95, 95)';

        if (inArray('tab-selected-darkmode', tabs[i].classList)) {
            tabs[i].classList.remove('tab-selected-darkmode');
            tabs[i].classList.add('tab-selected');
        }
    }

    for (let i = 0; i < navButtons.length; i++) {
        navButtons[i].style.backgroundColor = 'white';
        navButtons[i].style.color = 'black';
    }

    for (let i = 0; i < controlTitles.length; i++) {
        controlTitles[i].style.color = 'rgb(95, 95, 95)';
    }
}

// ---------------- FILE DROPDOWN ------------------

let fileButton = document.getElementById('file-button');
let fileButtonDropdown = document.getElementById('file-dropdown');
let filePrint = document.getElementById('file-print-container');
let fileRename = document.getElementById('file-rename-container');
let fileVersionHistory = document.getElementById('file-version-history-container');

function printCode() {
    codeInput.style.position = 'fixed';
    codeInput.style.width = '100%';
    codeInput.style.height = '100vh';
    codeInput.style.left = '0%';
    codeInput.style.top = '0%';
    codeInput.style.zIndex = '8';
    fileButtonDropdown.style.display = 'none';
    window.print();

    function removePrint() {
        codeInput.style.position = 'static';
        codeInput.style.width = '100%';
        codeInput.style.height = '80vh';
        codeInput.style.zIndex = 'initial';
    }

    document.addEventListener('click', removePrint);
}

fileButton.addEventListener('click', function () {
    if (fileButtonDropdown.style.display === 'none') {
        fileButtonDropdown.style.display = 'block';
    }

    else if (fileButtonDropdown.style.display === 'block') {
        fileButtonDropdown.style.display = 'none';
    }

    else {
        fileButtonDropdown.style.display = 'block'; // Fixes bug of button not working on first click
    }
});

document.addEventListener('click', function (e) {
    if (!fileButtonDropdown.contains(e.target) && !fileButton.contains(e.target)) {
        fileButtonDropdown.style.display = 'none';
    }
});

filePrint.addEventListener('click', function () {
    printCode();
});

fileRename.addEventListener('click', function () {
    fileButtonDropdown.style.display = 'none';
    selectElementContents(workspaceTitle);
    workspaceTitle.style.border = '2px solid #FF914D';
    workspaceTitle.style.padding = '1px 4px';
});

fileVersionHistory.addEventListener('click', function () {
    gitVersionContainer.style.display = 'block';
    hierarchyContents.style.display = 'none';
    presetsContents.style.display = 'none';
    topNavDividers[0].style.display = 'none';
    topNavDividerContainer.style.display = 'none';
    topNavContainer.style.display = 'none';
    fileButtonDropdown.style.display = 'none';
});

// ----------------- EDIT DROPDOWN -------------------

let editButton = document.getElementById('edit-button');
let editButtonDropdown = document.getElementById('edit-dropdown');

editButton.addEventListener('click', function () {
    if (editButtonDropdown.style.display === 'none') {
        editButtonDropdown.style.display = 'block';
    }

    else if (editButtonDropdown.style.display === 'block') {
        editButtonDropdown.style.display = 'none';
    }

    else {
        editButtonDropdown.style.display = 'block'; // Fixes bug of button not working on first click
    }
});

document.addEventListener('click', function (e) {
    if (!editButtonDropdown.contains(e.target) && !editButton.contains(e.target)) {
        editButtonDropdown.style.display = 'none';
    }
});

// ----------------- VIEW DROPDOWN -------------------

let viewButton = document.getElementById('view-button');
let viewButtonDropdown = document.getElementById('view-dropdown');
let viewDarkMode = document.getElementById('view-darkmode-container');
let viewLightMode = document.getElementById('view-lightmode-container');

viewButton.addEventListener('click', function () {
    if (viewButtonDropdown.style.display === 'none') {
        viewButtonDropdown.style.display = 'block';
    }

    else if (viewButtonDropdown.style.display === 'block') {
        viewButtonDropdown.style.display = 'none';
    }

    else {
        viewButtonDropdown.style.display = 'block'; // Fixes bug of button not working on first click
    }
});

document.addEventListener('click', function (e) {
    if (!viewButtonDropdown.contains(e.target) && !viewButton.contains(e.target)) {
        viewButtonDropdown.style.display = 'none';
    }
});

viewDarkMode.addEventListener('click', function () {
    toDarkMode();
});

viewLightMode.addEventListener('click', function () {
    toLightMode();
});

// ----------------- HORIZONTAL LAYOUT ------------------

let horizontalButton = document.getElementById('view-horizontal-container');
let verticalButton = document.getElementById('view-vertical-container');
let codeArea = document.getElementById('code-area');
let horizontalPreview = document.getElementById('horizontal-preview-area');
let horizontalPreviewContainer = document.getElementById('horizontal-preview');
let codeInputs = [codeInput, codeInputCSS, codeInputJS]

function toHorizontal() {

    for (let i = 0; i < codeInputs.length; i++) {
        codeInputs[i].style.height = '30vh';
        codeInputs[i].style.width = '100%';
        codeInputs[i].style.display = 'block';
        //codeInputs[i].addEventListener('input', livePreview());

        if (darkModeOn) {
            codeInputs[i].style.borderBottom = '2px solid rgb(120, 120, 120)';
        }
        else {
            codeInputs[i].style.borderBottom = '2px solid white';
        }
    }

    tabsContainer.style.display = 'none';
    codeArea.style.flexDirection = 'column';
    codeArea.style.width = '750px';
    codeInputJS.style.borderBottom = 'none';
    horizontalPreview.style.display = 'block';
}

function toVertical() {

    for (let i = 0; i < codeInputs.length; i++) {
        codeInputs[i].style.height = '75vh';
        codeInputs[i].style.width = '135%';
        codeInputs[i].style.borderBottom = 'none';
        codeInputs[i].oninput = '';
    }
    
    codeInputCSS.style.display = 'none';
    codeInputJS.style.display = 'none';
    tabsContainer.style.display = 'flex';
    codeArea.style.flexDirection = 'initial';
    codeArea.width = '115%';
    horizontalPreview.style.display = 'none';

    for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('tab-selected-darkmode');
        tabs[i].classList.remove('tab-selected');
    }

    if (darkModeOn) {
        indexTab.classList.add('tab-selected-darkmode');
    }

    else {
        indexTab.classList.add('tab-selected');
    }
}

horizontalButton.addEventListener('click', toHorizontal);
verticalButton.addEventListener('click', toVertical);

function livePreview() {

    horizontalPreviewContainer.innerHTML = '<iframe id="horizontal-preview-area"></iframe>';

    let frame2 = horizontalPreview.contentDocument.document;
    let htmlCode = codeInput.innerText;
    let cssCode = '<style>' + codeInputCSS.innerText + '</style>';
    let jsCode = '<script>' + codeInputJS.innerText + '</script>';

    frame2.open();
    frame2.write(htmlCode + cssCode + jsCode);
    frame2.close();
}

// ------------------ TOOL DROPDOWN -------------------

let toolButton = document.getElementById('tools-button');

// ------------------ HELP DROPDOWN -------------------

let helpButton = document.getElementById('help-button');

// -------------- GIT VERSIONING AREA -----------------

let gitVersionIconContainer = document.getElementById('collab-history-container');
let gitVersionContainer = document.getElementById('git-version-container');
let topNavDividerContainer = document.getElementById('top-nav-divider');
let topNavContainer = document.getElementById('top-nav');
let gitExit = document.getElementById('git-exit');

gitVersionIconContainer.addEventListener('click', function () {
    gitVersionContainer.style.display = 'block';
    hierarchyContents.style.display = 'none';
    presetsContents.style.display = 'none';
    topNavDividers[0].style.display = 'none';
    topNavDividerContainer.style.display = 'none';
    topNavContainer.style.display = 'none';
});

versionHistoryLink.addEventListener('click', function () {
    gitVersionContainer.style.display = 'block';
    hierarchyContents.style.display = 'none';
    presetsContents.style.display = 'none';
    topNavDividers[0].style.display = 'none';
    topNavDividerContainer.style.display = 'none';
    topNavContainer.style.display = 'none';
});

gitExit.addEventListener('click', function () {
    gitVersionContainer.style.display = 'none';
    hierarchyContents.style.display = 'block';
    topNavDividers[0].style.display = 'block';
    topNavDividerContainer.style.display = 'flex';
    topNavContainer.style.display = 'flex';
});