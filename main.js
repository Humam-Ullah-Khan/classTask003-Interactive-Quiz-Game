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
        question: "The First Female Prime Minister of Pakistan?",
        options: ["Benazir Bhutto", "Imran Khan", "Shahbaz Shareef", "Liaqat Ali"],
        answer: "Benazir Bhutto"
    }
];

let currentQuestionIndex = 0;
let score = 0;

function showQuestion() {
    const quizContent = document.getElementById('quizContent');
    const currentQuestion = questions[currentQuestionIndex];

    let optionsHtml = '';
    currentQuestion.options.forEach(option => {
        optionsHtml += `<li onClick="selectAnswer(this, '${option}')">${option}</li>`;
    });

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

    if (selectedOption === currentQuestion.answer) {
        optionElement.classList.add('correct');
        score++;
    } else {
        optionElement.classList.add('incorrect');
    }

    allOptions.forEach(option => {
        option.setAttribute('onClick', '');
        if (option.textContent === currentQuestion.answer) {
            option.classList.add('correct');
        }
    });

    document.querySelector('button').style.display = 'inline-block';
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