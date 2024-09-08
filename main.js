const questions = [
    {
        question: "The capital of Pakistan?",
        options: ["Karachi", "Lahore", "Islamabad", "Quetta"],
        answer: "Islamabad"
    },
    {
        question: "National flower of Pakistan?",
        options: ["Jasmine", "Rose", "Tulip", "Sunflower"],
        answer: "Jasmine"
    },
    {
        question: "Who is the Prime Minister of Pakistan?",
        options: ["Benazir Bhutto", "Imran Khan", "Shahbaz Shareef", "Liaqat Ali"],
        answer: "Shahbaz Shareef"
    }
];

let currentQuestionIndex = 0;
let score = 0;

function showQuestion() {
    const quizContent = document.getElementById('quizContent');
    const currentQuestion = questions[currentQuestionIndex];

    let optionsHtml = '';
    for (let i = 0; i < currentQuestion.options.length; i++) {
        optionsHtml += `<li onClick="selectAnswer(this, '${currentQuestion.options[i]}')">${currentQuestion.options[i]}</li>`;
    }

    quizContent.innerHTML = `
        <div class="question">
            <p>${currentQuestion.question}</p>
            <ul class="options">
                ${optionsHtml}
            </ul>
        </div>
    `;
}

function selectAnswer(optionElement, selectedOption) {
    const currentQuestion = questions[currentQuestionIndex];
    const allOptions = document.querySelectorAll('.options li');

    // Check if the selected option is correct
    if (selectedOption === currentQuestion.answer) {
        optionElement.classList.add('correct');
        score++;
    } else {
        optionElement.classList.add('incorrect');
    }

    // Disable all options and set cursor to 'not-allowed'
    for (let i = 0; i < allOptions.length; i++) {
        allOptions[i].setAttribute('onClick', ''); // Disable click
        allOptions[i].classList.add('disabled');
        allOptions[i].style.cursor = 'not-allowed';

        // Highlight the correct answer
        if (allOptions[i].textContent === currentQuestion.answer) {
            allOptions[i].classList.add('correct');
        }
    }

    document.querySelector('button').style.display = 'inline-block'; // Show Next button
}

function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
        document.querySelector('button').style.display = 'none';
    } else {
        document.getElementById('result').textContent = `You scored ${score} out of ${questions.length}.`;
        document.querySelector('button').style.display = 'none';
    }
}

showQuestion();