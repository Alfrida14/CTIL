document.addEventListener('DOMContentLoaded', () => {
    // Initialize stats in localStorage if they don't exist
    if (!localStorage.getItem('score')) {
        localStorage.setItem('score', 0);
        localStorage.setItem('correctAnswers', JSON.stringify([]));
        localStorage.setItem('incorrectAnswers', JSON.stringify([]));
    }

    const options = document.querySelectorAll('.option-button');
    const submitButton = document.querySelector('.submit-button');
    const nextQuestionButton = document.querySelector('.next-question-button');
    
    // Logic for the main quiz page (e.g., index_q1.html)
    if (submitButton) {
        submitButton.addEventListener('click', () => {
            const selectedOption = document.querySelector('.option-button.selected');
            if (selectedOption) {
                const answer = selectedOption.getAttribute('data-answer');
                let score = parseInt(localStorage.getItem('score'));
                let correctAnswers = JSON.parse(localStorage.getItem('correctAnswers'));
                let incorrectAnswers = JSON.parse(localStorage.getItem('incorrectAnswers'));
                
                // Check if the user has already answered this question to prevent resubmission
                if (!correctAnswers.includes(1) && !incorrectAnswers.includes(1)) {
                    if (answer === 'correct') {
                        score += 10;
                        correctAnswers.push(1); // Record question 1 as correct
                        localStorage.setItem('score', score);
                        localStorage.setItem('correctAnswers', JSON.stringify(correctAnswers));
                        window.location.href = 'correct_page_q1.html';
                    } else {
                        incorrectAnswers.push(1); // Record question 1 as incorrect
                        localStorage.setItem('incorrectAnswers', JSON.stringify(incorrectAnswers));
                        window.location.href = 'incorrect_page_q1.html';
                    }
                } else {
                    alert('You have already answered this question!');
                }
            } else {
                alert('Please select an answer!');
            }
        });

        options.forEach(option => {
            option.addEventListener('click', () => {
                options.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
            });
        });
    }

    // Logic for the "Next Question" button on correct/incorrect pages
    if (nextQuestionButton) {
        nextQuestionButton.addEventListener('click', () => {
            // Assuming this is the last question, go to the stats page
            // Otherwise, go to the next question
            window.location.href = 'index_q2.html';
        });
    }
});