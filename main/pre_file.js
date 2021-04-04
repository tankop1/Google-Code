// -------------- SEARCH BAR ---------------

let searchContainer = document.getElementById('search-container');
let searchExit = document.getElementById('search-exit-container');

searchContainer.addEventListener('click', function () {
    searchContainer.style.backgroundColor = 'white';
    searchContainer.style.boxShadow = '0.5px 0.5px 2px rgb(95, 95, 95)';
});

searchContainer.addEventListener('input', function () {
    if (document.getElementById('search-bar').value !== '') {
        searchExit.style.opacity = '1';
    }
    else {
        searchExit.style.opacity = '0';
    }
});

document.addEventListener('click', function (e) {
    if (!searchContainer.contains(e.target)) {
        searchContainer.style.backgroundColor = 'rgb(245, 245, 245)';
        searchContainer.style.boxShadow = 'none';
        searchExit.style.opacity = '0';
    }
});

searchExit.addEventListener('click', function () {
    document.getElementById('search-bar').value = '';
});

// -------------- PROJECT CLICK ---------------

let projectContainers = document.querySelectorAll('.project-container');
let settingsContainers = document.querySelectorAll('.project-settings-container');

for (let i = 0; i < projectContainers.length; i++) {
    projectContainers[i].addEventListener('click', function (e) {
        if (!settingsContainers[i].contains(e.target)) {
            console.log('HELLO');
            window.location.href = 'main.html';
        }
    });
}

// ------------- DROPDOWN CONTENT -------------

let recentButton = document.getElementById('recent-button');
let dropdownContent = document.getElementById('dropdown-contents');
let checkOne = document.getElementById('check-1');
let checkTwo = document.getElementById('check-2');
let checkThree = document.getElementById('check-3');
let rowOne = document.getElementById('row-1');
let rowTwo = document.getElementById('row-2');
let rowThree = document.getElementById('row-3');
let checks = [checkOne, checkTwo, checkThree];
let rows = [rowOne, rowTwo, rowThree];

recentButton.addEventListener('click', function () {
    if (dropdownContent.style.display === 'block') {
        console.log(dropdownContent.style.display);
        dropdownContent.style.display = 'none';
    }
    else {
        dropdownContent.style.display = 'block';
    }
});

for (let i = 0; i < rows.length; i++) {
    rows[i].addEventListener('click', function () {

        for (let j = 0; j < checks.length; j++) {
            checks[j].style.opacity = '0';
        }

        checks[i].style.opacity = '1';
    });
}

// -------------- TEMPLATES PAGE ---------------

let templateButton = document.getElementById('template-button');
let templateSection = document.querySelector('section');
let menuContainer = document.getElementById('menu-button-container');
let menuIcon = document.getElementById('menu-icon');
let templateHeader = document.getElementById('template-header');
let recentSection = document.querySelector('main');

templateButton.addEventListener('click', function () {
    if (templateSection.style.height !== '150vh') {
        templateSection.style.height = '150vh';
        menuContainer.innerHTML = '<i id="back-icon" class="fas fa-arrow-left"></i>';
        templateHeader.style.display = 'flex';
        recentSection.style.display = 'none';
    }
    else {
        templateSection.style.height = '300px';
        menuContainer.innerHTML = '<i id="menu-icon" class="fas fa-bars"></i>';
        templateHeader.style.display = 'none';
        recentSection.style.display = 'block';
    }
});

menuContainer.addEventListener('click', function () {
    if (templateSection.style.height === '150vh') {
        templateSection.style.height = '300px';
        menuContainer.innerHTML = '<i id="menu-icon" class="fas fa-bars"></i>';
        templateHeader.style.display = 'none';
        recentSection.style.display = 'block';
    }
});