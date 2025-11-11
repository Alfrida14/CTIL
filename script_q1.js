document.addEventListener('DOMContentLoaded', () => {

    // Helper function to extract the question number from the URL 
    // Assumes pages are named like: 'index_q1.html', 'c_index_q2.html', etc.
    const getCurrentQuestionNumber = () => {
        const url = window.location.href;
        // Search for 'q' followed by one or more digits
        const match = url.match(/q(\d+)\.html/);
        // Returns the number (e.g., 1, 2, 3...) or defaults to 1 if no number is found
        return match ? parseInt(match[1]) : 1; 
    };

    // --- Dynamic Question Number Retrieval ---
    const currentQuestionNumber = getCurrentQuestionNumber();
    const totalQuestions = 5; // Set the total number of questions per category

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

                // --- CRITICAL FIX: PREVENT DOUBLE-SUBMISSION ---
                // Checks the dynamically retrieved question number
                if (!correctAnswers.includes(currentQuestionNumber) && !incorrectAnswers.includes(currentQuestionNumber)) {
                    
                    if (answer === 'correct') {
                        score += 10;
                        correctAnswers.push(currentQuestionNumber);
                        
                        // Save the updated score and correctAnswers array
                        localStorage.setItem('score', score);
                        localStorage.setItem('correctAnswers', JSON.stringify(correctAnswers));
                        
                        // Navigate to the correct feedback page dynamically
                        window.location.href = `c_correct_q${currentQuestionNumber}.html`; 
                    } else {
                        incorrectAnswers.push(currentQuestionNumber);
                        
                        // Save the updated incorrectAnswers array
                        localStorage.setItem('incorrectAnswers', JSON.stringify(incorrectAnswers));
                        
                        // Navigate to the incorrect feedback page dynamically
                        window.location.href = `c_incorrect_q${currentQuestionNumber}.html`;
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
            const nextQuestionNumber = currentQuestionNumber + 1;
            
            if (nextQuestionNumber > totalQuestions) {
                // If past the last question, go to the stats page
                window.location.href = 'stats_page.html';
            } else {
                // Navigate to the next question dynamically
                window.location.href = `c_index_q${nextQuestionNumber}.html`;
            }
        });
    }
});