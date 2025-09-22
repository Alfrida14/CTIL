document.addEventListener('DOMContentLoaded', () => {
    // THIS BLOCK SHOULD ONLY BE IN YOUR FIRST SCRIPT (script_q1.js)
    // It initializes the score and arrays.
    if (!localStorage.getItem('score')) {
        localStorage.setItem('score', 0);
        localStorage.setItem('correctAnswers', JSON.stringify([]));
        localStorage.setItem('incorrectAnswers', JSON.stringify([]));
    }

    const options = document.querySelectorAll('.option-button');
    const submitButton = document.querySelector('.submit-button');
    const nextQuestionButton = document.querySelector('.next-question-button');

    if (submitButton) {
        submitButton.addEventListener('click', () => {
            const selectedOption = document.querySelector('.option-button.selected');
            if (selectedOption) {
                const answer = selectedOption.getAttribute('data-answer');

                // Get the current data from localStorage
                let score = parseInt(localStorage.getItem('score')) || 0;
                let correctAnswers = JSON.parse(localStorage.getItem('correctAnswers')) || [];
                let incorrectAnswers = JSON.parse(localStorage.getItem('incorrectAnswers')) || [];

                // This is for question 1. The number must change for each question script.
                const currentQuestionNumber = 1;

                // Check if the question has already been answered
                if (!correctAnswers.includes(currentQuestionNumber) && !incorrectAnswers.includes(currentQuestionNumber)) {
                    if (answer === 'correct') {
                        score += 10;
                        correctAnswers.push(currentQuestionNumber);
                        localStorage.setItem('score', score);
                        localStorage.setItem('correctAnswers', JSON.stringify(correctAnswers));
                        window.location.href = 'correct_page_q1.html';
                    } else {
                        incorrectAnswers.push(currentQuestionNumber);
                        localStorage.setItem('incorrectAnswers', JSON.stringify(incorrectAnswers));
                        window.location.href = 'incorrect_page_q1.html';
                    }
                } else {
                    alert('You have already answered this question!');
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
    
    // Logic for the "Next Question" button on correct/incorrect pages
    if (nextQuestionButton) {
        nextQuestionButton.addEventListener('click', () => {
            // Redirect to the next question page
            window.location.href = 'index_q2.html';
        });
    }
});