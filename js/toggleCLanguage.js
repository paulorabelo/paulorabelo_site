var divsEnglish = document.getElementsByClassName('us-en');
var divsPortuguese = document.getElementsByClassName('pt-br');

// setDisplay(divsEnglish, 'block');
// setDisplay(divsPortuguese, 'none');

setDisplay(divsEnglish, 'none');
setDisplay(divsPortuguese, 'block');

function toggleLanguage() {
    toggleDisplay(divsEnglish);
    toggleDisplay(divsPortuguese);
}

function setDisplay(elements, display) {
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = display;
    }
}

function toggleDisplay(elements) {
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = (elements[i].style.display === 'none') ? 'block' : 'none';
    }
}

document.getElementById('toggleButton').addEventListener('click', toggleLanguage);