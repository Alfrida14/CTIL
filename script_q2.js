document.addEventListener('DOMContentLoaded', () => {
    const optionsContainer = document.querySelector('.options-container');
    const submitButton = document.querySelector('.submit-button');

    // Handle option selection and highlighting
    optionsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('option-button')) {
            // Remove 'selected' class from all buttons
            document.querySelectorAll('.option-button').forEach(button => {
                button.classList.remove('selected');
            });
            // Add 'selected' class to the clicked button
            event.target.classList.add('selected');
        }
    });

    // Handle the submission and redirect
    submitButton.addEventListener('click', () => {
        const selectedOption = optionsContainer.querySelector('.option-button.selected');

        if (!selectedOption) {
            alert('Please select an answer!');
            return;
        }

        const isCorrect = selectedOption.dataset.answer === 'correct';

        if (isCorrect) {
            window.location.href = 'correct_page_q1.html';
        } else {
            window.location.href = 'incorrect_page_q1.html';
        }
    });
});