document.addEventListener('DOMContentLoaded', () => {
    // Elements in stats_page.html
    const finalScoreElement = document.getElementById('final-score');
    const correctListElement = document.getElementById('correct-list');
    const incorrectListElement = document.getElementById('incorrect-list');
    const restartButton = document.querySelector('.restart-button');

    // Helper function to handle display logic (Correctly handles stored index 0 by displaying 1)
    const appendAnswerToList = (listElement, qNum) => {
        // CRITICAL FIX: If the stored number is 0 (zero-index), display it as 1.
        // This is necessary because your quiz script is likely saving 0 for Q1.
        const displayNum = (qNum === 0 ? 1 : qNum); 
        
        // Ensure we only process valid question numbers (1 and above)
        if (displayNum >= 1) { 
            const li = document.createElement('li');
            li.textContent = `Question ${displayNum}`;
            listElement.appendChild(li);
        }
    };

    // Get the total score and display it
    const score = localStorage.getItem('score') || '0';
    if (finalScoreElement) {
        finalScoreElement.textContent = score;
    }

    // Display correct questions
    const correctAnswers = JSON.parse(localStorage.getItem('correctAnswers')) || [];
    if (correctAnswers.length > 0 && correctListElement) {
        // FIX APPLIED HERE: Use the helper function instead of manual loop
        correctAnswers.forEach(qNum => {
            appendAnswerToList(correctListElement, qNum);
        });
    }

    // Display incorrect questions
    const incorrectAnswers = JSON.parse(localStorage.getItem('incorrectAnswers')) || [];
    if (incorrectAnswers.length > 0 && incorrectListElement) {
        // FIX APPLIED HERE: Use the helper function instead of manual loop
        incorrectAnswers.forEach(qNum => {
            appendAnswerToList(incorrectListElement, qNum);
        });
    }

    // Restart quiz
    if (restartButton) {
        restartButton.addEventListener('click', () => {
            // Clear only the quiz-specific saved data
            localStorage.removeItem('score');
            localStorage.removeItem('correctAnswers');
            localStorage.removeItem('incorrectAnswers');

            // Go back to first question
            window.location.href = 'index_q1.html';
        });
    }
});
