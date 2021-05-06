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
            } // Changes page title
    
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
        } // Changes page title

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
}); // Toggles coloring star icon on click

// -------------- TERMINAL UP / DOWN -----------------

let terminalContainer = document.getElementById('terminal-container');
let terminalButton = document.getElementById('preview-inpage-container');
let terminalIcon = document.getElementById('preview-inpage');
let terminalTooltip = document.getElementById('terminal-tooltip');

let control = true;

terminalButton.addEventListener('click', function () {

    if (control) {
        terminalInput.style.display = 'block';
        terminalContainer.classList.remove('terminal-down');
        terminalButton.classList.remove('button-down');
        terminalTooltip.classList.remove('tooltip-down');
        terminalContainer.classList.add('terminal-up');
        terminalButton.classList.add('button-up');
        terminalTooltip.classList.add('tooltip-up');
        control = false;
    }

    else {
        setTimeout(function () {
            terminalInput.style.display = 'none';
        }, 400);
        terminalContainer.classList.remove('terminal-up');
        terminalButton.classList.remove('button-up');
        terminalTooltip.classList.remove('tooltip-up');
        terminalContainer.classList.add('terminal-down');
        terminalButton.classList.add('button-down');
        terminalTooltip.classList.add('tooltip-down');
        control = true;
    }
}); // Adds animations to move terminal up and down

// ------------------- PREVIEW BUTTON ---------------------

let previewContainer = document.getElementById('preview-container');

previewContainer.addEventListener('click', function () {
    showPreview();
}); // showPreview function is located in preview.js

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

// Colors and changes contents when hierarchy tab is clicked
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

// Colors and changes contents when presets tab is clicked
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

// Returns true if item is in an array
function inArray(item, array) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === item) {
            return true;
        }
    }
    return false;
}

// Changes carot icon to be up or down on click / collapses folder contents
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

// Handles opening a tab after all tabs were closed
function noneToTabs(thisTab) {
    /*codeInput.style.display = 'block';
    codeInput.style.justifyContent = 'none';
    codeInput.style.alignItems = 'none';

    if (darkModeOn) {
        codeInput.style.backgroundColor = 'rgb(95, 95, 95)';
        body.style.backgroundColor = 'rgb(95, 95, 95)';
        tabsContainer.style.backgroundColor = 'rgb(130, 130, 130)';
    }
    
    else {
        codeInput.style.backgroundColor = 'rgb(245, 245, 245)';
        body.style.backgroundColor = 'rgb(245, 245, 245)';
    }

    for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('tab-selected');
        tabs[i].classList.remove('tab-selected-darkmode');
    }

    if (darkModeOn) {
        thisTab.classList.add('tab-selected-darkmode');
    }

    else {
        thisTab.classList.add('tab-selected');
    }*/

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

    tabsGone.style.display = 'none';
}

// Listening for hierarchy item click
indexItem.addEventListener('click', function () {
    indexTab.style.display = 'flex';
    noneToTabs(indexTab);
    changeCurrentTab(codeInput);
});

// Listening for hierarchy item click
styleItem.addEventListener('click', function () {
    styleTab.style.display = 'flex';
    noneToTabs(styleTab);
    changeCurrentTab(codeInputCSS);
});

// Listening for hierarchy item click
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
} // Changes tab to specified tab

let tabExits = document.querySelectorAll('.tab-exit');
let currentTextBeforeClose = codeInput.innerText;
let tabsGone = document.getElementById('tabs-gone-container');

// Allows tabs to be highlighted when clicked
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

// If selected tab is closed, this function finds another tab to become selected
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

// Changes tab on click
indexTab.addEventListener('click', function (e) {
    let clickInIndexTab = indexExit.contains(e.target);
    if (!clickInIndexTab) {
        changeCurrentTab(codeInput);
    }
});

// Changes tab on click
styleTab.addEventListener('click', function (e) {
    let clickInStyleTab = styleExit.contains(e.target);
    if (!clickInStyleTab) {
        changeCurrentTab(codeInputCSS);
    }
});

// Changes tab on click
appTab.addEventListener('click', function (e) {
    let clickInAppTab = appExit.contains(e.target);
    if (!clickInAppTab) {
        changeCurrentTab(codeInputJS);
    }
});

// Handles all tabs being closed (displays greyscale logo)
function allTabsClosed() {
    /*currentTextBeforeClose = codeInput.innerHTML;
    codeInput.style.backgroundColor = 'rgb(220, 220, 220)';
    codeInput.innerHTML = '<img src="assets/google-code-logo-grayscale.png" alt="Greyscale Logo" id="greyscale-logo">';
    codeInput.style.display = 'flex';
    codeInputCSS.style.display = 'none';
    codeInputJS.style.display = 'none';
    codeInput.style.justifyContent = 'center';
    codeInput.style.alignItems = 'center';
    if (darkModeOn) {
        body.style.backgroundColor = 'rgb(120, 120, 120)';
        codeInput.style.backgroundColor = 'rgb(120, 120, 120)';
        tabsContainer.style.backgroundColor = 'rgb(120, 120, 120)';
    }
    else {
        body.style.backgroundColor = 'rgb(220, 220, 220)';
        codeInput.style.backgroundColor = 'rgb(220, 220, 220)';
    }*/
    tabsGone.style.display = 'flex';
}

// --------------- FAVICON PRESET FUNCTIONALITY ----------------

let fileLinks = [];
let previewSRC = '';

// Shows preview for favicon file
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

// Splits code into seperate characters (Which I now realize could have been done with .split())
function split(code) {
    let chars = [];
    for (let i = 0; i < code.length; i++) {
        chars.push(code[i]);
    }
    return chars;
}

// Changes styling of favicon preset when preview is loaded
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

let faviconLinkCode = '';

function linkFavicon(e) {
    const { files } = e.target;
        const reader = new FileReader();
        reader.addEventListener('load', e => {
            const url = reader.result;
            faviconLinkCode = url;
            return faviconLinkCode;
        });

    reader.readAsDataURL(files[0]);
} // This function was taken from www.stackoverflow.com

// ------------------ PREVIEW REFRESH --------------------

let refreshContainer = document.getElementById('refresh-container');

// Refreshes preview if refresh button pressed
refreshContainer.addEventListener('click', function () {
    refreshContainer.classList.add('refreshing');
    showPreview();
});

// Resets animation for refresh button
refreshContainer.addEventListener('mouseenter', function () {
    refreshContainer.classList.remove('refreshing');
});

// ---------------- DRAGGABLE PRESETS ------------------

let previewDisplayImg = document.getElementById('favicon-img-display-img');
let draggableActive = false;

draggableMouseDown(previewDisplayImg);

// Allows object to be dragged by user
function draggableMouseDown(object) {

    // Moves object to coordinates of mouse
    function moveCode(e) {
        let x = e.clientX;
        let y = e.clientY;

        object.style.left = (x - 30) + 'px';
        object.style.top = (y - 30) + 'px';
    }

    // Starts draggable feature
    object.addEventListener('mousedown', function () {
        object.style.cursor = 'grabbing';
        body.style.cursor = 'grabbing';
        object.style.position = 'fixed';
        object.style.left = '1284px';
        object.style.top = '221px';
        draggableActive = true;
        document.addEventListener('mousemove', moveCode);
    });

    // Ends draggable feature and places draggable object down
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

// A TON of variable declarations for darkmode

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
let presetTitle = document.querySelectorAll('.preset-title');
let morePresetsButton = document.getElementById('preset-library-button');
let fileDropdown = document.getElementById('file-dropdown');
let editDropdown = document.getElementById('edit-dropdown');
let viewDropdown = document.getElementById('view-dropdown');

// Toggles darkmode and lightmode when dark mode button is clicked
darkModeButton.addEventListener('click', function () {
    if (codeInput.style.color !== 'white') {
        darkModeButton.style.backgroundColor = 'rgb(95, 95, 95)';
        toDarkMode();
    }

    else {
        toLightMode();
    }
});

// Changes hover event listener for icons in darkmode
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

// Changes hover event listener for icons in lightmode
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

// A REALLY long and ugly function that changes everything to darkmode
function toDarkMode() {
    let selectedTab = document.querySelector('.tab-selected');
    darkModeOn = true;

    codeInput.style.backgroundColor = 'rgb(95, 95, 95)';
    codeInput.style.color = 'white';
    codeInputCSS.style.backgroundColor = 'rgb(95, 95, 95)';
    codeInputCSS.style.color = 'white';
    codeInputJS.style.backgroundColor = 'rgb(95, 95, 95)';
    codeInputJS.style.color = 'white';
    body.style.backgroundColor = 'rgb(95, 95, 95)';
    tabsContainer.style.backgroundColor = 'rgb(130, 130, 130)';
    terminalIcon.style.color = 'rgb(240, 240, 240)';
    terminalButton.style.boxShadow = '0.5px 0.5px 3px rgb(150, 150, 150)';
    header.style.backgroundColor = 'rgb(75, 75, 75)';
    header.style.color = 'white';
    divider.style.backgroundColor = 'rgb(110, 110, 110)';
    rightNav.style.borderLeft = '1px solid rgb(110, 110, 110)';
    topNavDividers[0].style.border = '.5px solid rgb(110, 110, 110)';
    topNavDividers[1].style.border = '.5px solid rgb(110, 110, 110)';
    topNavDividers[2].style.border = '.5px solid rgb(110, 110, 110)';
    topNavDividers[3].style.border = '.5px solid rgb(110, 110, 110)';
    topNavDividers[4].style.border = '.5px solid rgb(110, 110, 110)';
    toDarkIcons();
    changeTheme();
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
    morePresetsButton.style.backgroundColor = 'rgb(95, 95, 95)';
    morePresetsButton.style.color = 'white';
    fileDropdown.style.backgroundColor = 'rgb(110, 110, 110)';
    editDropdown.style.backgroundColor = 'rgb(110, 110, 110)';
    viewDropdown.style.backgroundColor = 'rgb(110, 110, 110)';

    if (presetsActive) {
        hierarchyTab.style.color = 'rgb(200, 200, 200)';
    }
    else {
        presetsTab.style.color = 'rgb(200, 200, 200)';
    }

    for (let i = 0; i < tabs.length; i++) {
        tabs[i].style.backgroundColor = 'rgb(110, 110, 110)';
        tabTitles[i].style.color = 'white';
        tabExits[i].style.color = 'white';

        if (inArray('tab-selected', tabs[i].classList)) {
            tabs[i].classList.remove('tab-selected');
            tabs[i].classList.add('tab-selected-darkmode');
        }
    }

    for (let i = 0; i < presetTitle.length; i++) {
        presetTitle[i].style.color = 'white';
    }

    for (let i = 0; i < items.length; i++) {
        items[i].style.border = '1px solid rgb(75, 75, 75)';
    }

    for (let i = 0; i < navButtons.length; i++) {
        navButtons[i].style.backgroundColor = 'rgb(75, 75, 75)';
        navButtons[i].style.color = 'white';
    }

    for (let i = 0; i < controlTitles.length; i++) {
        controlTitles[i].style.color = 'white';
    }
}

// Another REALLY long and ugly function that changes everything to lightmode
function toLightMode() {
    let selectedTab = document.querySelector('.tab-selected');
    darkModeOn = false;

    codeInput.style.backgroundColor = 'rgb(245, 245, 245)';
    codeInput.style.color = 'black';
    codeInputCSS.style.backgroundColor = 'rgb(245, 245, 245)';
    codeInputCSS.style.color = 'black';
    codeInputJS.style.backgroundColor = 'rgb(245, 245, 245)';
    codeInputJS.style.color = 'black';
    body.style.backgroundColor = 'rgb(245, 245, 245)';
    tabsContainer.style.backgroundColor = 'rgb(220, 220, 220)';
    terminalIcon.style.color = 'rgb(95, 95, 95)';
    terminalButton.style.boxShadow = '0.5px 0.5px 2px rgb(177, 177, 177)';
    header.style.backgroundColor = 'white';
    header.style.color = 'rgb(95, 95, 95)';
    divider.style.backgroundColor = 'lightgrey';
    rightNav.style.borderLeft = '1px solid rgb(199, 199, 199)';
    topNavDividers[0].style.border = '.5px solid rgb(199, 199, 199)';
    topNavDividers[1].style.border = '.5px solid rgb(199, 199, 199)';
    topNavDividers[2].style.border = '.5px solid rgb(199, 199, 199)';
    topNavDividers[3].style.border = '.5px solid rgb(199, 199, 199)';
    topNavDividers[4].style.border = '.5px solid rgb(199, 199, 199)';
    toLightIcons();
    changeTheme();
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
    morePresetsButton.style.backgroundColor = 'rgb(245, 245, 245)';
    morePresetsButton.style.color = 'rgb(95, 95, 95)';
    fileDropdown.style.backgroundColor = 'white';
    editDropdown.style.backgroundColor = 'white';
    viewDropdown.style.backgroundColor = 'white';

    if (presetsActive) {
        hierarchyTab.style.color = 'rgb(95, 95, 95)';
    }
    else {
        presetsTab.style.color = 'rgb(95, 95, 95)';
    }

    for (let i = 0; i < tabs.length; i++) {
        tabs[i].style.backgroundColor = 'rgb(230, 230, 230)';
        tabTitles[i].style.color = 'rgb(95, 95, 95)';
        tabExits[i].style.color = 'rgb(95, 95, 95)';

        if (inArray('tab-selected-darkmode', tabs[i].classList)) {
            tabs[i].classList.remove('tab-selected-darkmode');
            tabs[i].classList.add('tab-selected');
        }
    }

    for (let i = 0; i < presetTitle.length; i++) {
        presetTitle[i].style.color = 'rgb(95, 95, 95)';
    }

    for (let i = 0; i < items.length; i++) {
        items[i].style.border = '1px solid white';
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

// Changes some styling to capture code when printing
function printCode() {
    codeInput.style.position = 'fixed';
    codeInput.style.width = '100%';
    codeInput.style.height = '100vh';
    codeInput.style.left = '0%';
    codeInput.style.top = '0%';
    codeInput.style.zIndex = '8';
    fileButtonDropdown.style.display = 'none';
    window.print();

    // changes styling back
    function removePrint() {
        codeInput.style.position = 'static';
        codeInput.style.width = '100%';
        codeInput.style.height = '80vh';
        codeInput.style.zIndex = 'initial';
    }

    document.addEventListener('click', removePrint);
}

// Allows dropdown to appear when nav button clicked
fileButton.addEventListener('click', function () {
    if (fileButtonDropdown.style.display === 'none') {
        fileButtonDropdown.style.display = 'block';
        //codeInput.style.zIndex = '-1';
    }

    else if (fileButtonDropdown.style.display === 'block') {
        fileButtonDropdown.style.display = 'none';
        //codeInput.style.zIndex = '1';
    }

    else {
        fileButtonDropdown.style.display = 'block'; 
        //codeInput.style.zIndex = '-1';// Fixes bug of button not working on first click
    }
});

// Checks for click outside of dropdown
document.addEventListener('click', function (e) {
    if (!fileButtonDropdown.contains(e.target) && !fileButton.contains(e.target)) {
        fileButtonDropdown.style.display = 'none';
        //codeInput.style.zIndex = '1';
    }
});

filePrint.addEventListener('click', function () {
    printCode();
});

// Allows project renaming on button click
fileRename.addEventListener('click', function () {
    fileButtonDropdown.style.display = 'none';
    selectElementContents(workspaceTitle);
    workspaceTitle.style.border = '2px solid #FF914D';
    workspaceTitle.style.padding = '1px 4px';
});

// Opens version history in right nav
fileVersionHistory.addEventListener('click', function () {
    gitVersionContainer.style.display = 'block';
    hierarchyContents.style.display = 'none';
    presetsContents.style.display = 'none';
    topNavDividers[0].style.display = 'none';
    topNavDividerContainer.style.display = 'none';
    topNavContainer.style.display = 'none';
    fileButtonDropdown.style.display = 'none';
});

// NOT ALL THE DROPDOWN BUTTONS WORK.... yet

// ----------------- EDIT DROPDOWN -------------------

let editButton = document.getElementById('edit-button');
let editButtonDropdown = document.getElementById('edit-dropdown');

// Allows dropdown to appear when nav button clicked
editButton.addEventListener('click', function () {
    if (editButtonDropdown.style.display === 'none') {
        editButtonDropdown.style.display = 'block';
        codeArea.style.zIndex = '-1';
    }

    else if (editButtonDropdown.style.display === 'block') {
        editButtonDropdown.style.display = 'none';
        codeArea.style.zIndex = 'initial';
    }

    else {
        editButtonDropdown.style.display = 'block';
        codeArea.style.zIndex = '-1'; // Fixes bug of button not working on first click
    }
});

document.addEventListener('click', function (e) {
    if (!editButtonDropdown.contains(e.target) && !editButton.contains(e.target)) {
        editButtonDropdown.style.display = 'none';
        codeArea.style.zIndex = 'initial';
    }
});

// THERE IS NO FUNCTIONALITY IN THIS DROPDOWN YET

// ----------------- VIEW DROPDOWN -------------------

let viewButton = document.getElementById('view-button');
let viewButtonDropdown = document.getElementById('view-dropdown');
let viewDarkMode = document.getElementById('view-darkmode-container');
let viewLightMode = document.getElementById('view-lightmode-container');
let viewChangeTheme = document.getElementById('view-mode-container');
let changeThemeContainer = document.getElementById('change-theme-container');
let chromeTheme = document.getElementById('theme1');
let dreamweaverTheme = document.getElementById('theme2');
let eclipseTheme = document.getElementById('theme3');
let iplasticTheme = document.getElementById('theme4');
let githubTheme = document.getElementById('theme5');
let themeContainers = [chromeTheme, dreamweaverTheme, eclipseTheme, iplasticTheme, githubTheme];
let themes = ['chrome', 'dreamweaver', 'eclipse', 'iplastic', 'github'];

function newTheme(theme) {
    if (darkModeOn) {
        alert('Changing the theme currently only works with light mode. Dark mode theme changing will come soon.');
    }

    else {
        editor.setTheme("ace/theme/" + theme);
        editorCSS.setTheme("ace/theme/" + theme);
        editorJS.setTheme("ace/theme/" + theme);
    }
}

// Allows dropdown to appear when nav button clicked
viewButton.addEventListener('click', function () {
    if (viewButtonDropdown.style.display === 'none') {
        viewButtonDropdown.style.display = 'block';
        codeInput.style.zIndex = '-1';
        codeInputCSS.style.zIndex = '-1';
        codeInputJS.style.zIndex = '-1';
    }

    else if (viewButtonDropdown.style.display === 'block') {
        viewButtonDropdown.style.display = 'none';
        codeInput.style.zIndex = 'initial';
        codeInputCSS.style.zIndex = 'initial';
        codeInputJS.style.zIndex = 'initial';
    }

    else {
        viewButtonDropdown.style.display = 'block';
        codeInput.style.zIndex = '-1'; // Fixes bug of button not working on first click
        codeInputCSS.style.zIndex = '-1';
        codeInputJS.style.zIndex = '-1';
    }
});

document.addEventListener('click', function (e) {
    if (!viewButtonDropdown.contains(e.target) && !viewButton.contains(e.target)) {
        viewButtonDropdown.style.display = 'none';
        codeInput.style.zIndex = 'initial';
        codeInputCSS.style.zIndex = 'initial';
        codeInputJS.style.zIndex = 'initial';
    }
});

// Allows darkmode or lightmode on button click
viewDarkMode.addEventListener('click', function () {
    toDarkMode();
});

viewLightMode.addEventListener('click', function () {
    toLightMode();
});

viewChangeTheme.addEventListener('mouseover', function () {
    changeThemeContainer.style.display = 'flex';
});

document.addEventListener('mouseover', function (e) {
    if (!changeThemeContainer.contains(e.target) && !viewChangeTheme.contains(e.target)) {
        changeThemeContainer.style.display = 'none';
    }
});

for (let i = 0; i < themeContainers.length; i++) {
    themeContainers[i].addEventListener('click', function () {
        newTheme(themes[i]);
    });
}

// ----------------- HORIZONTAL LAYOUT ------------------

let horizontalButton = document.getElementById('view-horizontal-container');
let verticalButton = document.getElementById('view-vertical-container');
let codeArea = document.getElementById('code-area');
let horizontalPreview = document.getElementById('horizontal-preview-area');
let horizontalPreviewContainer = document.getElementById('horizontal-preview');
let codeInputs = [codeInput, codeInputCSS, codeInputJS];

// A long function that changes layout to horizontal
function toHorizontal() {

    for (let i = 0; i < codeInputs.length; i++) {
        codeInputs[i].style.height = '30vh';
        codeInputs[i].style.width = '100%';
        codeInputs[i].style.display = 'block';

        if (darkModeOn) {
            codeInputs[i].style.borderBottom = '2px solid rgb(120, 120, 120)';
        }
        else {
            codeInputs[i].style.borderBottom = '2px solid white';
        }
    }

    tabsContainer.style.display = 'none';
    codeArea.style.flexDirection = 'column';
    codeInputJS.style.borderBottom = 'none';
}

// Changes layout back to vertical
function toVertical() {

    for (let i = 0; i < codeInputs.length; i++) {
        codeInputs[i].style.height = '99.9%';
        codeInputs[i].style.width = '100%';
        codeInputs[i].style.borderBottom = 'none';
        codeInputs[i].oninput = '';
    }
    
    codeInputCSS.style.display = 'none';
    codeInputJS.style.display = 'none';
    tabsContainer.style.display = 'flex';
    codeArea.style.flexDirection = 'initial';

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

// Allows live programming mode to show preview on input
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

// Opens git versioning in right nav
gitVersionIconContainer.addEventListener('click', function () {
    gitVersionContainer.style.display = 'block';
    hierarchyContents.style.display = 'none';
    presetsContents.style.display = 'none';
    topNavDividers[0].style.display = 'none';
    topNavDividerContainer.style.display = 'none';
    topNavContainer.style.display = 'none';
});

// Opens git versioning in right nav
versionHistoryLink.addEventListener('click', function () {
    gitVersionContainer.style.display = 'block';
    hierarchyContents.style.display = 'none';
    presetsContents.style.display = 'none';
    topNavDividers[0].style.display = 'none';
    topNavDividerContainer.style.display = 'none';
    topNavContainer.style.display = 'none';
});

// Closes git versioning when exit button pressed
gitExit.addEventListener('click', function () {
    gitVersionContainer.style.display = 'none';
    hierarchyContents.style.display = 'block';
    topNavDividers[0].style.display = 'block';
    topNavDividerContainer.style.display = 'flex';
    topNavContainer.style.display = 'flex';
});

// ------------- PRESET CODE AREA --------------

let codeContainer = document.getElementById('preset-code-container');
let codeExit = document.getElementById('code-exit');
let popupContainer = document.getElementById('popup-container');
let tooltipContainer = document.getElementById('tooltip-container');
let codeTitle = document.getElementById('code-title');
let codeIcon = document.getElementById('code-icon');
let codeHTML = document.getElementById('preset-html');
let codeCSS = document.getElementById('preset-css');
let codeJS = document.getElementById('preset-js');

codeExit.addEventListener('click', function () {
    codeContainer.style.display = 'none';
    presetsContents.style.display = 'block';
    topNavDividers[0].style.display = 'block';
    topNavDividerContainer.style.display = 'flex';5
    topNavContainer.style.display = 'flex';
});

popupContainer.addEventListener('click', function () {
    codeContainer.style.display = 'block';
    hierarchyContents.style.display = 'none';
    presetsContents.style.display = 'none';
    topNavDividers[0].style.display = 'none';
    topNavDividerContainer.style.display = 'none';
    topNavContainer.style.display = 'none';
    codeTitle.innerText = 'Popup Message';
    codeIcon.src = 'https://static.thenounproject.com/png/40746-200.png';
    codeHTML.innerText = `<button id="google-popup-button">Click Me</button>
    <div id="google-popup-shader">
        <div id="google-popup-container">
            <div id="google-popup-title-container">
                <h1 id="google-popup-title">Popup Message Title</h1>
                <button id="google-popup-exit">&times;</button>
            </div>
            <p id="google-popup-message">Replace this text with your popup message</p>
        </div>
    </div>
    `;
    codeCSS.innerText = `#google-popup-shader {
        width: 100%;
        height: 100%;
        top: 0%;
        left: 0%;
        background-color: rgba(0, 0, 0, 0.4);
        align-items: center;
        justify-content: center;
        position: fixed;
        display: none;
    }

    #google-popup-container {
        width: 45%;
        height: 30%;
        border-radius: 15px;
        background-color: white;
    }

    #google-popup-title-container {
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 100%;
    }

    #google-popup-title {
        font-family: sans-serif;
    }

    #google-popup-exit {
        padding: 5px 12px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.5rem;
        outline: none;
        border: none;
        background-color: white;
    }

    #google-popup-exit:hover {
        background-color: rgb(245, 245, 245);
    }

    #google-popup-message {
        font-family: sans-serif;
        text-align: center;
        margin-top: 50px;
    }`;
    codeJS.innerText = `let googlePopupShader = document.getElementById('google-popup-shader');
    let googlePopupButton = document.getElementById('google-popup-button');
    let googlePopupExit = document.getElementById('google-popup-exit');

    googlePopupButton.addEventListener('click', function () {
        googlePopupShader.style.display = 'flex';
    });

    googlePopupExit.addEventListener('click', function () {
        googlePopupShader.style.display = 'none';
    });`;
    //codeHTML.innerHTML = compileHTML(codeHTML.innerText);
    //codeCSS.innerHTML = compileCSS(codeCSS.innerText);
});

tooltipContainer.addEventListener('click', function () {
    codeContainer.style.display = 'block';
    hierarchyContents.style.display = 'none';
    presetsContents.style.display = 'none';
    topNavDividers[0].style.display = 'none';
    topNavDividerContainer.style.display = 'none';
    topNavContainer.style.display = 'none';
    codeTitle.innerText = 'Information Tooltip';
    codeIcon.src = 'https://static.thenounproject.com/png/171320-200.png';
    codeHTML.innerText = `<div id="google-tooltip">
    <p id="google-tooltip-button">i</p>
    <div id="google-tooltip-container">
        <p id="google-tooltip-message">Replace this text with your tooltip message</p>
    </div>
</div>`;
    codeCSS.innerText = `#google-tooltip {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 325px;
        height: max-content;
    }

    #google-tooltip-button {
        font-family: sans-serif;
        font-weight: bold;
        font-size: 1.5rem;
        color: rgb(95, 95, 95);
        padding: 5px 15px;
        width: max-content;
        border-radius: 50%;
        border: 2px solid rgb(95, 95, 95);
        cursor: pointer;
    }

    #google-tooltip-button:hover {
        background-color: rgb(245, 245, 245);
    }

    #google-tooltip-button:hover ~ #google-tooltip-container {
        visibility: visible;
    }

    #google-tooltip-container {
        padding: 0px 10px;
        background-color: rgba(0, 0, 0, 0.75);
        font-family: sans-serif;
        font-size: .85rem;
        color: white;
        border-radius: 5px;
        width: max-content;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 25px;
        visibility: hidden;
    }`;
    codeJS.innerText = 'No Javascript needed!';
    //codeHTML.innerHTML = compileHTML(codeHTML.innerText);
    //codeCSS.innerHTML = compileCSS(codeCSS.innerText);
});


// ----------- TOOLTIP FUNCTIONALITY -----------

let tooltips = document.querySelectorAll('.tooltip');
let tooltipActivaters = document.querySelectorAll('.tooltip-activator');
let tooltipActive = 0;

for (let i = 0; i < tooltips.length; i++) {
    tooltipActivaters[i].addEventListener('mouseenter', function () {
        tooltips[i].style.backgroundColor = 'rgba(95, 95, 95, 0.9)';
        //tooltips[i].style.display = 'block';
        tooltipActive = i;
        setTimeout(function () {
            if (tooltipActive === i) {
                tooltips[i].style.transform = 'scale(1)';
                rightNav.style.zIndex = '-1';
            }
        }, 500);
    });
    
    tooltipActivaters[i].addEventListener('mouseleave', function () {
        //tooltips[i].style.display = 'none';
        setTimeout(function () {
            tooltips[i].style.transform = 'scale(0)';
            rightNav.style.zIndex = 'initial';
        }, 500);
        setTimeout(function () {
            tooltips[i].style.transform = 'scale(0)';
            rightNav.style.zIndex = 'initial';
        }, 400);
        setTimeout(function () {
            tooltips[i].style.transform = 'scale(0)';
            rightNav.style.zIndex = 'initial';
        }, 300);
        setTimeout(function () {
            tooltips[i].style.transform = 'scale(0)';
            rightNav.style.zIndex = 'initial';
        }, 200);
        setTimeout(function () {
            tooltips[i].style.transform = 'scale(0)';
            rightNav.style.zIndex = 'initial';
        }, 100);
    });
}

darkModeButton.addEventListener('mouseenter', function () {
    //rightNav.style.zIndex = '-1';
});

darkModeButton.addEventListener('mouseleave', function () {
    //rightNav.style.zIndex = 'initial';
});

// ---------------- RIGHT CLICK FUNCTIONALITY --------------

let rightClickHierarchy = document.getElementById('right-click-hierarchy');
let itemContainers = document.querySelectorAll('.item-container');
let rightClick = 0;
let typeContainer = document.getElementById('type-container');
let changeType = document.getElementById('right-click-hierarchy-type');
let x = 0;
let y = 0;

for (let i = 0; i < itemContainers.length; i++) {
    itemContainers[i].addEventListener('contextmenu', function (e) {
        e.preventDefault();
        x = e.clientX;
        y = e.clientY;

        rightClickHierarchy.style.left = (x -1255) + 'px';
        rightClickHierarchy.style.top = (y - 65) + 'px';
        rightClickHierarchy.style.display = 'flex';

        rightClick = i;
    });
}

document.addEventListener('click', function (e) {
    if (!rightClickHierarchy.contains(e.target)) {
        rightClickHierarchy.style.display = 'none';
    }

    if (!items[rightClick].contains(e.target) && !rightClickHierarchy.contains(e.target)) {
        let ext = findExtension(items[rightClick].innerText);
        setItemIcon(ext, rightClick);
        
        if (darkModeOn) {
            items[rightClick].style.border = '1px solid rgb(75, 75, 75)';
        }
        
        else {
            items[rightClick].style.border = '1px solid white';
        }
        
        items[rightClick].contentEditable = 'false';
    }
});

changeType.addEventListener('mouseover', function () {
    let rightClickLeft = rightClickHierarchy.style.left;
    let rightClickTop = rightClickHierarchy.style.top;
    
    typeContainer.style.left = (x - 85) + 'px';
    typeContainer.style.top = (y + 36) + 'px';
    typeContainer.style.display = 'flex';
});

document.addEventListener('mouseover', function (e) {
    if (!typeContainer.contains(e.target) && !changeType.contains(e.target)) {
        typeContainer.style.display = 'none';
    }
});

// RENAME AND CHANGE TYPE FUNCTIONALITY

let hierarchyRename = document.getElementById('right-click-hierarchy-rename');
let items = document.querySelectorAll('.item');
let itemIcons = document.querySelectorAll('.item-icon');
let tabIcons = document.querySelectorAll('.tab-icon');
let types = document.querySelectorAll('.type');
let typeHTML = document.getElementById('type-html');
let typeCSS = document.getElementById('type-css');
let typeJS = document.getElementById('type-js');
let editorTypes = ['html', 'css', 'javascript'];

hierarchyRename.addEventListener('click', function () {
    rightClickHierarchy.style.display = 'none';

    if (darkModeOn) {
        items[rightClick].style.border = '1px solid white';
    }
    
    else {
        items[rightClick].style.border = '1px solid rgb(95, 95, 95)';
    }

    items[rightClick].contentEditable = 'true';
    selectElementContents(items[rightClick]);
});

for (let i = 0; i < items.length; i++) {
    items[i].addEventListener('keydown', (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            let ext = findExtension(items[rightClick].innerText);
            setItemIcon(ext, rightClick);
            changeFileType(ext, rightClick);
            
            if (darkModeOn) {
                items[rightClick].style.border = '1px solid rgb(75, 75, 75)';
            }
            
            else {
                items[rightClick].style.border = '1px solid white';
            }

            items[rightClick].contentEditable = 'false';
        }
    });
}

for (let i = 0; i < types.length; i++) {
    types[i].addEventListener('click', function () {
        let newExtentions = ['html', 'css', 'js'];
        changeExtension(newExtentions[i], rightClick);
        changeFileType(newExtentions[i], rightClick);
    });
}



function findExtension(filename) {
    let startExtension = false;
    let extension = '';

    for (let i = 0; i < filename.length; i++) {
        if (startExtension) {
            extension += filename[i]
        }

        if (filename[i] === '.') {
            startExtension = true;
        }
    }
    startExtension = false;
    return extension;
}

function changeExtension(newExt, itemIndex) {
    setItemIcon(newExt, itemIndex);
    let newItemName = getNewName(items[itemIndex].innerText, newExt);
    items[itemIndex].innerText = newItemName;
    tabTitles[itemIndex].innerText = newItemName;
}

function getNewName(oldName, newExt) {
    let newName = '';
    let endName = false;

    for (let i = 0; i < oldName.length; i++) {
        if (oldName[i] !== '.' && !endName) {
            newName += oldName[i];
        }
        else {
            endName = true;
        }
    }

    return newName + '.' + newExt;
}

function setItemIcon(extension, itemIndex) {
    itemIcons[itemIndex].classList.remove('fa-html5', 'fa-css3', 'fa-js-square');
    tabIcons[itemIndex].classList.remove('fa-html5', 'fa-css3', 'fa-js-square');

    if (extension === 'js') {
        itemIcons[itemIndex].classList.add('fa-js-square');
        tabIcons[itemIndex].classList.add('fa-js-square');
    }

    else if (extension === 'css') {
        itemIcons[itemIndex].classList.add('fa-css3');
        tabIcons[itemIndex].classList.add('fa-css3');
    }

    else {
        itemIcons[itemIndex].classList.add('fa-html5');
        tabIcons[itemIndex].classList.add('fa-html5');
    }

    tabTitles[itemIndex].innerText = items[itemIndex].innerText;
}

function changeFileType(filetype, itemIndex) {
    let editors = [editor, editorCSS, editorJS];

    if (filetype === 'js') {
        filetype = 'javascript';
    }

    editors[itemIndex].getSession().setMode("ace/mode/" + filetype);
    editorTypes[itemIndex] = filetype;
}

// DELETE FUNCTIONALITY

let hierarchyDelete = document.getElementById('right-click-hierarchy-delete');
let deletePopupContainer = document.getElementById('delete-popup-container');
let popupExit = document.getElementById('popup-exit');
let cancelDeleteButton = document.getElementById('popup-no');
let deleteButton = document.getElementById('popup-yes');

hierarchyDelete.addEventListener('click', function () {
    deletePopupContainer.style.display = 'block';
});

popupExit.addEventListener('click', function () {
    deletePopupContainer.style.display = 'none';
});

cancelDeleteButton.addEventListener('click', function () {
    deletePopupContainer.style.display = 'none';
});

deleteButton.addEventListener('click', function () {
    deletePopupContainer.style.display = 'none';
    deleteItem(rightClick);
});

function deleteItem(itemIndex) {
    tabs[itemIndex].style.display = 'none';
    itemContainers[itemIndex].style.display = 'none';

    if (inArray('tab-selected', tabs[itemIndex].classList)) {
        tabs[itemIndex].classList.remove('tab-selected');
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

    editorTypes[itemIndex] = 'deleted';
}

// --------------- COPY PRESET CODE ----------------

let copyHTML = document.getElementById('copy-html');
let copyCSS = document.getElementById('copy-css');
let copyJS = document.getElementById('copy-js');

function copyText(element) {
    let range, selection, worked;
  
    if (document.body.createTextRange) {
      range = document.body.createTextRange();
      range.moveToElementText(element);
      range.select();
    } else if (window.getSelection) {
      selection = window.getSelection();        
      range = document.createRange();
      range.selectNodeContents(element);
      selection.removeAllRanges();
      selection.addRange(range);
    }
    
    try {
      document.execCommand('copy');
    }
    catch (err) {
        alert('There was an error copying the code. Please try again.');
    }
} // This function was taken from www.stackoverflow.com

copyHTML.addEventListener('click', function () {
    copyText(codeHTML);
});

copyCSS.addEventListener('click', function () {
    copyText(codeCSS);
});

copyJS.addEventListener('click', function () {
    copyText(codeJS);
});

// --------------- UPLOAD IMAGE FUNCTIONALITY ----------------

let imageCount = 0;
let imageLinks = [];
let images = [];
let imageItemPreview = document.getElementById('image-item-preview');
let imagePreviewImg = document.getElementById('image-preview-img');

function addImage() {
    imageCount++;
    folderContents[0].innerHTML += `<div class="item-container image-item" id="image-${imageCount}-container">
    <i class="far fa-image item-icon image-icon"></i>
    <p class="item">Image ${imageCount}</p>
</div>`;
    images.push(document.getElementById('image-' + imageCount + '-container'));
    setPreviewListeners();
}

// HOVER IMAGE FUNCTIONALITY

function setPreviewListeners() {
    for (let i = 0; i < images.length; i++) {
        images[i].addEventListener('mouseenter', function () {
            imageItemPreview.style.display = 'block';
            console.log(imageItemPreview.style.display);
            //previewImage(0);
        });
    
        images[i].addEventListener('mouseleave', function () {
            imageItemPreview.style.display = 'none';
            console.log(imageItemPreview.style.display)
        });
    }
}

function previewImage(itemIndex) {
    let preview = document.getElementById('image-preview-img');
    let file = document.getElementById('file-upload').files[0];
    let reader = new FileReader();
  
    reader.onloadend = function () {
        imageLinks.push(reader.result);
    }
  
    if (file) {
        reader.readAsDataURL(file);
    } else {
        preview.src = "";
    }

    preview.src = imageLinks[itemIndex];
}

// ------------------- EXPORT TO PREVIEW ---------------------

let websiteButton = document.getElementById('website-button');

websiteButton.addEventListener('click', function () {
    let newUrl = prompt('What do you want your file url to be?');
    console.log(newUrl);
    /*window.location.href = 'finished_project.html';

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

    previewCode = listToString(previewCode);

    showPreviewGoogleCode(previewCode);*/
});

// ---------------- ACE SYNTAX HIGHLIGHTING ------------------

// HTML

function setupEditor() {
    window.editor = ace.edit("code-input");
    editor.setTheme("ace/theme/chrome");
    editor.getSession().setMode("ace/mode/html");
    editor.setValue(`<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="style.css">
        <title>Untitled project</title>
    </head>
    <body>
        <script src="app.js"></script>
    </body>
</html>`, 1); //1 = moves cursor to end
  
    editor.focus();
    
    editor.setOptions({
      fontSize: "12pt",
      showLineNumbers: true,
      showGutter: true,
      vScrollBarAlwaysVisible: false
    });
  
    editor.setShowPrintMargin(false);
    editor.setBehavioursEnabled(false);
}

function changeTheme() {
    if (darkModeOn) {
        editor.setTheme("ace/theme/gruvbox"); //dracula
        editorCSS.setTheme("ace/theme/gruvbox");
        editorJS.setTheme("ace/theme/gruvbox");
    }

    else {
        editor.setTheme("ace/theme/chrome"); //iplastic
        editorCSS.setTheme("ace/theme/chrome");
        editorJS.setTheme("ace/theme/chrome");
    }
}
  
setupEditor();

// CSS

function setupEditorCSS() {
    window.editorCSS = ace.edit("code-input-css");
    editorCSS.setTheme("ace/theme/chrome");
    editorCSS.getSession().setMode("ace/mode/css");
    editorCSS.setValue(`body {

}`,1);
  
    editorCSS.focus();
    
    editorCSS.setOptions({
      fontSize: "12pt",
      showLineNumbers: true,
      showGutter: true,
      vScrollBarAlwaysVisible: false
    });
  
    editorCSS.setShowPrintMargin(false);
    editorCSS.setBehavioursEnabled(false);
}
  
setupEditorCSS();

// JS

function setupEditorJS() {
    window.editorJS = ace.edit("code-input-js");
    editorJS.setTheme("ace/theme/chrome");
    editorJS.getSession().setMode("ace/mode/javascript");
    editorJS.setValue(`function myFunction() {

}`,1);
  
    editorJS.focus();
    
    editorJS.setOptions({
      fontSize: "12pt",
      showLineNumbers: true,
      showGutter: true,
      vScrollBarAlwaysVisible: false
    });
  
    editorJS.setShowPrintMargin(false);
    editorJS.setBehavioursEnabled(false);
}
  
setupEditorJS();