document.addEventListener('DOMContentLoaded', () => {
    const nextQuestionButton = document.querySelector('.next-question-button');

    if (nextQuestionButton) {
        nextQuestionButton.addEventListener('click', () => {
            window.location.href = 'question_2.html';
        });
    }
});