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

                const currentQuestionNumber = 2; // Q2

                // --- CRITICAL FIX: PREVENT DOUBLE-SUBMISSION ---
                if (!correctAnswers.includes(currentQuestionNumber) && !incorrectAnswers.includes(currentQuestionNumber)) {
                    
                    if (answer === 'correct') {
                        score += 10;
                        correctAnswers.push(currentQuestionNumber);
                        localStorage.setItem('score', score);
                        localStorage.setItem('correctAnswers', JSON.stringify(correctAnswers));
                        window.location.href = 'c_correct_q2.html';
                    } else {
                        incorrectAnswers.push(currentQuestionNumber);
                        localStorage.setItem('incorrectAnswers', JSON.stringify(incorrectAnswers));
                        window.location.href = 'c_incorrect_q2.html';
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
            window.location.href = 'c_index_q3.html';
        });
    }
});
