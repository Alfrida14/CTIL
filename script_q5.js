document.addEventListener('DOMContentLoaded', () => {

    // Helper function to extract the question number from the URL
    const getCurrentQuestionNumber = () => {
        const url = window.location.href;
        // Search for 'q' followed by one or more digits
        const match = url.match(/q(\d+)\.html/);
        // Returns the number (e.g., 1, 2, 3...) or defaults to 1 if no number is found
        return match ? parseInt(match[1]) : 1; 
    };

    // Helper function to get the category prefix (e.g., 'c_', 'co_')
    const getCategoryPrefix = () => {
        const url = window.location.pathname;
        
        // This regex looks for 'something' followed by '_index', '_correct', or '_incorrect'
        const match = url.match(/(\w+)_(index|correct|incorrect)/); 
        
        if (match && match[1]) {
            return match[1] + '_';
        }
        
        return '';
    };

    // --- Dynamic Variables Retrieval ---
    const categoryPrefix = getCategoryPrefix();
    const currentQuestionNumber = getCurrentQuestionNumber(); 
    const totalQuestions = 5; // The script will check against this number
    
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
                if (!correctAnswers.includes(currentQuestionNumber) && !incorrectAnswers.includes(currentQuestionNumber)) {
                    
                    if (answer === 'correct') {
                        score += 10;
                        correctAnswers.push(currentQuestionNumber);
                        localStorage.setItem('score', score);
                        localStorage.setItem('correctAnswers', JSON.stringify(correctAnswers));
                        
                        // Navigate to the correct feedback page dynamically
                        window.location.href = `${categoryPrefix}correct_q${currentQuestionNumber}.html`;
                    } else {
                        incorrectAnswers.push(currentQuestionNumber);
                        localStorage.setItem('incorrectAnswers', JSON.stringify(incorrectAnswers));
                        
                        // Navigate to the incorrect feedback page dynamically
                        window.location.href = `${categoryPrefix}incorrect_q${currentQuestionNumber}.html`;
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
            const nextQuestionNumber = currentQuestionNumber + 1;
            
            // This is the final question check!
            if (nextQuestionNumber > totalQuestions) {
                // Redirects to the final stats page
                window.location.href = 'stats_page.html'; 
            } else {
                // If this somehow runs on Q5, it would redirect to Q6 (which should not happen)
                window.location.href = `${categoryPrefix}index_q${nextQuestionNumber}.html`;
            }
        });
    }
});