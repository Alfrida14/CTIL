document.addEventListener('DOMContentLoaded', () => {

    // Helper function to extract the question number from the URL
    // Assumes pages are named like: 'prefix_index_q1.html', 'prefix_correct_q2.html', etc.
    const getCurrentQuestionNumber = () => {
        const url = window.location.href;
        // Search for 'q' followed by one or more digits
        const match = url.match(/q(\d+)\.html/);
        // Returns the number (e.g., 1, 2, 3...) or defaults to 1 if no number is found
        return match ? parseInt(match[1]) : 1;
    };

    // Helper function to get the category prefix (e.g., 'c_', 'cl_', or '')
    // This looks for a string followed by an underscore (e.g., 'cl_') at the start of the relevant filename part
    const getCategoryPrefix = () => {
        const url = window.location.pathname;
        // This regex looks for 'something' followed by '_index', '_correct', or '_incorrect'
        const match = url.match(/(\w+)_(index|correct|incorrect)/);
        
        // If a prefix is found (e.g., 'c', 'cl'), return it with an underscore
        if (match && match[1]) {
            return match[1] + '_';
        }
        
        // If no prefix is found, return an empty string
        return '';
    };

    // --- Dynamic Variables Retrieval ---
    const categoryPrefix = getCategoryPrefix();
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

                        // FIX: Navigate to the correct feedback page dynamically using the category prefix
                        window.location.href = `${categoryPrefix}correct_q${currentQuestionNumber}.html`;
                    } else {
                        incorrectAnswers.push(currentQuestionNumber);

                        // Save the updated incorrectAnswers array
                        localStorage.setItem('incorrectAnswers', JSON.stringify(incorrectAnswers));

                        // FIX: Navigate to the incorrect feedback page dynamically using the category prefix
                        window.location.href = `${categoryPrefix}incorrect_q${currentQuestionNumber}.html`;
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
                // FIX: Navigate to the next question dynamically using the category prefix
                window.location.href = `${categoryPrefix}index_q${nextQuestionNumber}.html`;
            }
        });
    }
});