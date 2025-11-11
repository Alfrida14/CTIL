// categories_script.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Selector definition
    // Note: The selector here should be '.category-item' based on your HTML, 
    // even though the list class is 'categories-list'.
    const categoryItems = document.querySelectorAll('.category-item'); 
    
    // --- THIS IS THE CODE YOU ASKED ABOUT ---
    // Add event listener to save the category just before the link is clicked
    categoryItems.forEach(item => {
        item.addEventListener('click', () => {
            const selectedCategory = item.getAttribute('data-category');
            
            // CRITICAL: Save the category so the next page knows which quiz to load
            localStorage.setItem('quizCategory', selectedCategory);
            
            // The browser will handle navigation because the <a> tag was clicked
        });
    });
    // ----------------------------------------

    // Note: If you removed the separate START QUIZ button, 
    // the code handling that button's click event is no longer needed here.
});