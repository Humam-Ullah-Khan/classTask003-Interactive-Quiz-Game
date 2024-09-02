const questions = [
  {
      question: "Which city is the capital of Pakistan?",
      options: ["Karachi", "Lahore", "Islamabad", "Quetta"],
      answer: "Islamabad"
  },
  {
      question: "What is the national flower of Pakistan?",
      options: ["Jasmine", "Rose", "Tulip", "Sunflower"],
      answer: "Jasmine"
  },
  {
      question: "Who was the first female Prime Minister of Pakistan?",
      options: ["Benazir Bhutto", "Fatima Jinnah", "Hina Rabbani Khar", "Asma Jahangir"],
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

  // Disable further selection
  allOptions.forEach(option => {
      option.setAttribute('onClick', ''); // Disable click
      if (option.textContent === currentQuestion.answer) {
          option.classList.add('correct'); // Show correct answer
      }
  });

  // Show the "Next" button
  document.querySelector('button').style.display = 'inline-block';
}

function nextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
      showQuestion();
      
  } else {
      document.getElementById('result').textContent = `You scored ${score} out of ${questions.length}.`;
  }
}

// Show the first question initially
showQuestion();