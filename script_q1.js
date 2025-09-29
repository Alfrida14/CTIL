document.addEventListener('DOMContentLoaded', () => {
    // 1. --- CRITICAL FIX: ENSURE INITIALIZATION ONLY RUNS ONCE ---
    // Clear and set initial values for a new quiz
    localStorage.setItem('score', 0); 
    localStorage.setItem('correctAnswers', JSON.stringify([]));
    localStorage.setItem('incorrectAnswers', JSON.stringify([]));
    // -----------------------------------------------------------

    const options = document.querySelectorAll('.option-button');
    const submitButton = document.querySelector('.submit-button');
    const nextQuestionButton = document.querySelector('.next-question-button');

    if (submitButton) {
        submitButton.addEventListener('click', () => {
            const selectedOption = document.querySelector('.option-button.selected');
            if (selectedOption) {
                const answer = selectedOption.getAttribute('data-answer');
                
                // Retrieve the current data
                let score = parseInt(localStorage.getItem('score')) || 0;
                let correctAnswers = JSON.parse(localStorage.getItem('correctAnswers')) || [];
                let incorrectAnswers = JSON.parse(localStorage.getItem('incorrectAnswers')) || [];

                const currentQuestionNumber = 1;

                // --- PREVENT DOUBLE-SUBMISSION ---
                if (!correctAnswers.includes(currentQuestionNumber) && !incorrectAnswers.includes(currentQuestionNumber)) {
                    
                    if (answer === 'correct') {
                        score += 10;
                        correctAnswers.push(currentQuestionNumber);
                        
                        // 2. CRITICAL: Save the updated score
                        localStorage.setItem('score', score);
                        
                        localStorage.setItem('correctAnswers', JSON.stringify(correctAnswers));
                        window.location.href = 'correct_page_q1.html';
                    } else {
                        incorrectAnswers.push(currentQuestionNumber);
                        localStorage.setItem('incorrectAnswers', JSON.stringify(incorrectAnswers));
                        window.location.href = 'incorrect_page_q1.html';
                    }

                } else {
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
            window.location.href = 'index_q2.html';
        });
    }
});

