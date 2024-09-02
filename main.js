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
      optionsHtml += `<li><input type="radio" name="q${currentQuestionIndex}" value="${option}"> ${option}</li>`;
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

function nextQuestion() {
  const selectedOption = document.querySelector(`input[name="q${currentQuestionIndex}"]:checked`);
  
  if (selectedOption && selectedOption.value === questions[currentQuestionIndex].answer) {
      score++;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
      showQuestion();
  } else {
      document.getElementById('result').textContent = `You scored ${score} out of ${questions.length}.`;
      document.querySelector('button').style.display = 'none';  // Hide the Next button after the last question
  }
}

// Show the first question initially
showQuestion();