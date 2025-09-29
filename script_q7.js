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

                const currentQuestionNumber = 7; // Q7

                // --- CRITICAL FIX: PREVENT DOUBLE-SUBMISSION ---
                // Only update the score if this question hasn't been answered yet.
                if (!correctAnswers.includes(currentQuestionNumber) && !incorrectAnswers.includes(currentQuestionNumber)) {
                    
                    if (answer === 'correct') {
                        score += 10;
                        correctAnswers.push(currentQuestionNumber);
                        localStorage.setItem('score', score);
                        localStorage.setItem('correctAnswers', JSON.stringify(correctAnswers));
                        window.location.href = 'correct_page_q7.html';
                    } else {
                        incorrectAnswers.push(currentQuestionNumber);
                        localStorage.setItem('incorrectAnswers', JSON.stringify(incorrectAnswers));
                        window.location.href = 'incorrect_page_q7.html';
                    }
                } else {
                    // Alert the user if they try to submit again
                    alert('You have already submitted an answer for this question!');
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
            // This is the link to the next question
            window.location.href = 'index_q8.html';
        });
    }
});