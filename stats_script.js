document.addEventListener('DOMContentLoaded', () => {
    // Get the HTML element to display the score
    const finalScoreElement = document.getElementById('final-score');
    const correctListElement = document.getElementById('correct-list');
    const incorrectListElement = document.getElementById('incorrect-list');
    const restartButton = document.querySelector('.restart-button');
    
    // Retrieve the score from localStorage
    const finalScore = localStorage.getItem('score');

    // Display the final score. Use '0' as a fallback if the score is not found.
    if (finalScoreElement) {
        finalScoreElement.textContent = finalScore || '0';
    }
    
    // Display the list of correct answers
    const correctAnswers = JSON.parse(localStorage.getItem('correctAnswers')) || [];
    if (correctAnswers && correctListElement) {
        correctAnswers.forEach(qNum => {
            const listItem = document.createElement('li');
            listItem.textContent = `Question ${qNum}`;
            correctListElement.appendChild(listItem);
        });
    }

    // Display the list of incorrect answers
    const incorrectAnswers = JSON.parse(localStorage.getItem('incorrectAnswers')) || [];
    if (incorrectAnswers && incorrectListElement) {
        incorrectAnswers.forEach(qNum => {
            const listItem = document.createElement('li');
            listItem.textContent = `Question ${qNum}`;
            incorrectListElement.appendChild(listItem);
        });
    }

    // Add a click event to the restart button to clear localStorage and start over
    if (restartButton) {
        restartButton.addEventListener('click', () => {
            localStorage.clear();
            window.location.href = 'index_q1.html';
        });
    }
});