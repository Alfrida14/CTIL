document.addEventListener('DOMContentLoaded', () => {
    // Select the main START QUIZ button on the starting page
    const startQuizButton = document.querySelector('.start-quiz-button');

    // Attach the event listener to the button
    if (startQuizButton) {
        startQuizButton.addEventListener('click', () => {
            
            // Optional: Clear previous quiz data when starting a new session
            localStorage.removeItem('score');
            localStorage.removeItem('quizCategory');
            
            // CRITICAL: Redirect the user to the categories page
            // Assuming your categories page is named 'categories_page.html'
            window.location.href = 'categories_page.html';
        });
    }

    // Note: If your starting page also has category selection, 
    // this logic would be combined with the category selection logic.
});