document.addEventListener('DOMContentLoaded', () => {
    const categoryItems = document.querySelectorAll('.category-item');
    const startQuizButton = document.querySelector('.start-quiz-button');
    
    // 1. Initially disable the START QUIZ button until a choice is made
    startQuizButton.disabled = true;

    // --- Category Selection Logic ---
    categoryItems.forEach(item => {
        item.addEventListener('click', () => {
            
            // Remove 'selected' class from all items
            categoryItems.forEach(i => i.classList.remove('selected'));
            
            // Add 'selected' class to the clicked item (visual feedback)
            item.classList.add('selected');
            
            // Enable the START QUIZ button
            startQuizButton.disabled = false;
            
            // Store the selected category name (e.g., "Constitutional Law")
            const selectedCategory = item.getAttribute('data-category');
            localStorage.setItem('quizCategory', selectedCategory);
            
            // Optional: Provide bold text feedback on the button
            startQuizButton.innerHTML = `START ${selectedCategory.toUpperCase()} QUIZ`; 
        });
    });

    // --- Start Quiz Button Logic (Redirection) ---
    startQuizButton.addEventListener('click', () => {
        
        // Final check to ensure a category is selected
        if (localStorage.getItem('quizCategory')) {
            
            // 2. CRITICAL: Reset all previous score data for a fresh start
            localStorage.setItem('score', 0);
            localStorage.removeItem('correctAnswers');
            localStorage.removeItem('incorrectAnswers');
            
            // 3. Redirection to the first question page
            window.location.href = 'index_q1.html';
            
        } else {
            alert('Please select a category to start the quiz!');
        }
    });
});