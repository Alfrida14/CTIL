document.addEventListener('DOMContentLoaded', () => {
    const finalScoreElement = document.getElementById('final-score');
    const correctListElement = document.getElementById('correct-list');
    const incorrectListElement = document.getElementById('incorrect-list');
    const restartButton = document.querySelector('.restart-button');
    
    // Retrieve data from localStorage
    const finalScore = localStorage.getItem('score');
    const correctAnswers = JSON.parse(localStorage.getItem('correctAnswers'));
    const incorrectAnswers = JSON.parse(localStorage.getItem('incorrectAnswers'));

    // Display the final score
    if (finalScoreElement) {
        finalScoreElement.textContent = finalScore;
    }
    
    // Display the list of correct answers
    if (correctAnswers && correctListElement) {
        correctAnswers.forEach(qNum => {
            const listItem = document.createElement('li');
            listItem.textContent = `Question ${qNum}`;
            correctListElement.appendChild(listItem);
        });
    }

    // Display the list of incorrect answers
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
            localStorage.clear(); // Clears all quiz data
            window.location.href = 'index_q1.html'; // Redirects to the first question
        });
    }
});