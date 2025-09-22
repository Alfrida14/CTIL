document.addEventListener('DOMContentLoaded', () => {
    const options = document.querySelectorAll('.option-button');
    const submitButton = document.querySelector('.submit-button');
    const nextQuestionButton = document.querySelector('.next-question-button');

    if (submitButton) {
        submitButton.addEventListener('click', () => {
            const selectedOption = document.querySelector('.option-button.selected');
            if (selectedOption) {
                const answer = selectedOption.getAttribute('data-answer');
                
                // Retrieve the current score and answered questions from localStorage
                let score = parseInt(localStorage.getItem('score')) || 0;
                let correctAnswers = JSON.parse(localStorage.getItem('correctAnswers')) || [];
                let incorrectAnswers = JSON.parse(localStorage.getItem('incorrectAnswers')) || [];

                const currentQuestionNumber = 5; // Q2

                // Update score and answers (user can submit multiple times)
                if (answer === 'correct') {
                    score += 10;
                    correctAnswers.push(currentQuestionNumber);
                    localStorage.setItem('score', score);
                    localStorage.setItem('correctAnswers', JSON.stringify(correctAnswers));
                    window.location.href = 'correct_page_q5.html';
                } else {
                    incorrectAnswers.push(currentQuestionNumber);
                    localStorage.setItem('incorrectAnswers', JSON.stringify(incorrectAnswers));
                    window.location.href = 'incorrect_page_q5.html';
                }
            } else {
                alert('Please select an answer!');
            }
        });

        // Highlight selected option
        options.forEach(option => {
            option.addEventListener('click', () => {
                options.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
            });
        });
    }

    if (nextQuestionButton) {
        nextQuestionButton.addEventListener('click', () => {
            window.location.href = 'index_q6.html';
        });
    }
});