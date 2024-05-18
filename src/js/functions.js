document.addEventListener('DOMContentLoaded', () => {
    const questions = document.querySelectorAll('.question');
    
    function toggleAnswer(answer) {
        // Verificar el estado actual y alternar
        if (window.getComputedStyle(answer).getPropertyValue('display') === 'none') {
            answer.style.display = 'block'; // Mostrar la respuesta
        } else {
            answer.style.display = 'none'; // Ocultar la respuesta
        }
    }
    
    function getState(answer) {
        return window.getComputedStyle(answer).getPropertyValue('display');
    }
    
    questions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.querySelector('.answer');
            toggleAnswer(answer);
            console.log("estado:" + getState(answer));
        });
    });

    function open() {
        const firstAnswerState = getState(questions[0].querySelector('.answer'));
        const secondAnswerState = getState(questions[1].querySelector('.answer'));
        console.log("estado en if: " + firstAnswerState);
        if (firstAnswerState === 'none' || secondAnswerState === 'none') {
            questions.forEach(question => {
                const answer = question.querySelector('.answer');
                if (getState(answer) === 'none') {
                    toggleAnswer(answer);
                }
            });
        }
    }
    
    const queson = document.getElementById('queson');
    const comfunciona = document.getElementById('comfunciona');
    
    queson.addEventListener('click', open);
    comfunciona.addEventListener('click', open);
});
