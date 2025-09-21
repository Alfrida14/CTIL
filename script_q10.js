document.addEventListener('DOMContentLoaded', () => {
    const options = document.querySelectorAll('.option-button');
    const submitButton = document.querySelector('.submit-button');

    if (submitButton) {
        submitButton.addEventListener('click', () => {
            const selectedOption = document.querySelector('.option-button.selected');
            if (selectedOption) {
                const answer = selectedOption.getAttribute('data-answer');
                if (answer === 'correct') {
                    window.location.href = 'correct_page_q10.html';
                } else {
                    window.location.href = 'incorrect_page_q10.html';
                }
            } else {
                alert('Please select an answer!');
            }
        });
    }

    options.forEach(option => {
        option.addEventListener('click', () => {
            options.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
        });
    });

    const nextQuestionButton = document.querySelector('.next-question-button');

    if (nextQuestionButton) {
        nextQuestionButton.addEventListener('click', () => {
            window.location.href = 'index_q5.html'; // Assuming the next question is named index_q5.html
        });
    }
});