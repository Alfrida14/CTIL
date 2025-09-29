document.addEventListener('DOMContentLoaded', () => {
    // Elements in stats_page.html
    const finalScoreElement = document.getElementById('final-score');
    const correctListElement = document.getElementById('correct-list');
    const incorrectListElement = document.getElementById('incorrect-list');
    const restartButton = document.querySelector('.restart-button');

    // Get the total score and display it
    const score = localStorage.getItem('score') || '0'; // Keep as string until display
    if (finalScoreElement) {
        finalScoreElement.textContent = score;
    }

    // Display correct questions
    const correctAnswers = JSON.parse(localStorage.getItem('correctAnswers')) || [];
    if (correctAnswers.length > 0 && correctListElement) {
        correctAnswers.forEach(qNum => {
            const li = document.createElement('li');
            li.textContent = `Question ${qNum}`;
            correctListElement.appendChild(li);
        });
    }

    // Display incorrect questions
    const incorrectAnswers = JSON.parse(localStorage.getItem('incorrectAnswers')) || [];
    if (incorrectAnswers.length > 0 && incorrectListElement) {
        incorrectAnswers.forEach(qNum => {
            const li = document.createElement('li');
            li.textContent = `Question ${qNum}`;
            incorrectListElement.appendChild(li);
            // Example of how to add a class for styling if needed
            // li.classList.add('incorrect-item'); 
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
