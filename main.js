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
      dropCelebrationItems();
  } else {
      optionElement.classList.add('incorrect');
  }

  allOptions.forEach(option => {
      option.setAttribute('onClick', ''); // Disable click
      if (option.textContent === currentQuestion.answer) {
          option.classList.add('correct'); // Show correct answer
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
      triggerFinalCelebration();
  }
}

function dropCelebrationItems() {
  const celebrationContainer = document.createElement('div');
  for (let i = 0; i < 50; i++) {
      const celebrationItem = document.createElement('div');
      celebrationItem.classList.add('celebration-item');
      celebrationItem.style.left = Math.random() * 100 + 'vw';
      celebrationItem.style.backgroundColor = getRandomColor();
      celebrationItem.style.animationDelay = Math.random() * 0.5 + 's'; // Separate drop timing
      celebrationContainer.appendChild(celebrationItem);
  }
  document.body.appendChild(celebrationContainer);

  setTimeout(() => {
      celebrationContainer.remove();
  }, 2000);
}

function triggerFinalCelebration() {
  for (let i = 0; i < 100; i++) {
      const celebrationItem = document.createElement('div');
      celebrationItem.classList.add('celebration-item');
      celebrationItem.style.left = Math.random() * 100 + 'vw';
      celebrationItem.style.backgroundColor = getRandomColor();
      celebrationItem.style.animationDelay = Math.random() * 0.5 + 's';
      document.body.appendChild(celebrationItem);
  }
}

function getRandomColor() {
  const colors = ['#ffcc00', '#ff6f61', '#ffccff', '#66ccff', '#99ff99'];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Show the first question initially
showQuestion();