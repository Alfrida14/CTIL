document.addEventListener('DOMContentLoaded', () => {
    // This part should be in the script for your FIRST question (script_q1.js)
    // if (!localStorage.getItem('score')) {
    //     localStorage.setItem('score', 0);
    //     localStorage.setItem('correctAnswers', JSON.stringify([]));
    //     localStorage.setItem('incorrectAnswers', JSON.stringify([]));
    // }

    const options = document.querySelectorAll('.option-button');
    const submitButton = document.querySelector('.submit-button');
    const nextQuestionButton = document.querySelector('.next-question-button');

    if (submitButton) {
        submitButton.addEventListener('click', () => {
            const selectedOption = document.querySelector('.option-button.selected');
            if (selectedOption) {
                const answer = selectedOption.getAttribute('data-answer');
                
                // Get the current score and answered questions from localStorage
                let score = parseInt(localStorage.getItem('score'));
                let correctAnswers = JSON.parse(localStorage.getItem('correctAnswers'));
                let incorrectAnswers = JSON.parse(localStorage.getItem('incorrectAnswers'));

                // This is the check for question 2
                if (!correctAnswers.includes(2) && !incorrectAnswers.includes(2)) {
                    if (answer === 'correct') {
                        score += 10;
                        correctAnswers.push(2); // Record question 2 as correct
                        localStorage.setItem('score', score);
                        localStorage.setItem('correctAnswers', JSON.stringify(correctAnswers));
                        window.location.href = 'correct_page_q2.html';
                    } else {
                        incorrectAnswers.push(2); // Record question 2 as incorrect
                        localStorage.setItem('incorrectAnswers', JSON.stringify(incorrectAnswers));
                        window.location.href = 'incorrect_page_q2.html';
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

    if (nextQuestionButton) {
        nextQuestionButton.addEventListener('click', () => {
            // This is the link to the next question
            window.location.href = 'index_q3.html';
        });
    }
});