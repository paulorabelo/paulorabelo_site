var divEnglish = document.getElementById('english');
var divPortuguese = document.getElementById('portuguese');

divEnglish.style.display = 'block';
divPortuguese.style.display = 'none';

function toggleLanguage() {

    
    if (divEnglish.style.display === 'none') {
        divEnglish.style.display = 'block';
        divPortuguese.style.display = 'none';
    } else {
        divEnglish.style.display = 'none';
        divPortuguese.style.display = 'block';
    }
}

document.getElementById('toggleButton').addEventListener('click', toggleLanguage);