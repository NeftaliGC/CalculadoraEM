const answer = document.querySelector('.answer');
const queson = document.getElementById('queson');
const comfunciona = document.getElementById('comfunciona');


function toggleAnswer(answer) {
    // Verificar el estado actual y alternar
    if (window.getComputedStyle(answer).getPropertyValue('display') === 'none') {
        answer.style.display = 'block'; // Mostrar la respuesta
    } else {
        answer.style.display = 'none'; // Ocultar la respuesta
    }
}


function getState() {
    return window.getComputedStyle(answer).getPropertyValue('display');
}

document.addEventListener('DOMContentLoaded', () => {
    const questions = document.querySelectorAll('.question');
    
    questions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.querySelector('.answer');
            toggleAnswer(answer);
            console.log("estado:" + getState());
        });
    });
    
    function open(btn) {
        console.log("estado en if:" + getState());
        
        if (getState() === 'none') {
            btn.onclick = () => {
                questions.forEach(question => {
                    question.click();
                });
            };
        }
    }
    
    queson.onclick = () => {
        open(queson);
    };
    
    comfunciona.onclick = () => {
        open(comfunciona);
    };
});