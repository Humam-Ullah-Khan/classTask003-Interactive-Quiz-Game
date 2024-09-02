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
let timeLeft = 10;
let timerInterval;

function startTimer() {
  timeLeft = 10;
  const timerElement = document.getElementById('timer');
  timerElement.textContent = `Time left: ${timeLeft}s`;
  timerElement.classList.remove('warning');

  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
      timeLeft--;
      timerElement.textContent = `Time left: ${timeLeft}s`;

      if (timeLeft <= 5) {
          timerElement.classList.add('warning');
      }

      if (timeLeft === 0) {
          clearInterval(timerInterval);
          lockOptions();
      }
  }, 1000);
}

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

  startTimer();
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

  clearInterval(timerInterval); // Stop the timer once an option is selected
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
      triggerFinalCelebration();
  }
}

function lockOptions() {
  const allOptions = document.querySelectorAll('.options li');
  allOptions.forEach(option => {
      option.setAttribute('onClick', ''); // Disable click
      if (option.textContent === questions[currentQuestionIndex].answer) {
          option.classList.add('correct'); // Show correct answer
      }
  });
  document.querySelector('button').style.display = 'inline-block'; // Show next button
}

function dropCelebrationItems() {
  const celebrationContainer = document.createElement('div');
  celebrationContainer.style.position = 'fixed';
  celebrationContainer.style.top = 0;
  celebrationContainer.style.left = 0;
  celebrationContainer.style.width = '100%';
  celebrationContainer.style.height = '100%';
  celebrationContainer.style.pointerEvents = 'none';
  document.body.appendChild(celebrationContainer);

  for (let i = 0; i < 50; i++) {
      const celebrationItem = document.createElement('div');
      celebrationItem.classList.add('celebration-item');
      celebrationItem.style.left = Math.random() * 100 + 'vw';
      celebrationItem.style.backgroundColor = getRandomColor();
      celebrationItem.style.animationDelay = Math.random() * 0.5 + 's'; // Separate drop timing
      celebrationContainer.appendChild(celebrationItem);
  }

  setTimeout(() => {
      celebrationContainer.remove();
  }, 2000);
}

function triggerFinalCelebration() {
  const celebrationContainer = document.createElement('div');
  celebrationContainer.style.position = 'fixed';
  celebrationContainer.style.top = 0;
  celebrationContainer.style.left = 0;
  celebrationContainer.style.width = '100%';
  celebrationContainer.style.height = '100%';
  celebrationContainer.style.pointerEvents = 'none';
  document.body.appendChild(celebrationContainer);

  for (let i = 0; i < 100; i++) {
      const celebrationItem = document.createElement('div');
      celebrationItem.classList.add('celebration-item');
      celebrationItem.style.left = Math.random() * 100 + 'vw';
      celebrationItem.style.backgroundColor = getRandomColor();
      celebrationItem.style.animationDelay = Math.random() * 0.5 + 's'; // Separate drop timing
      celebrationContainer.appendChild(celebrationItem);
  }

  setTimeout(() => {
      celebrationContainer.remove();
  }, 3000);
}

function getRandomColor() {
  const colors = ['#FF6347', '#FFD700', '#32CD32', '#1E90FF', '#FF69B4', '#FF4500', '#9400D3'];
  return colors[Math.floor(Math.random() * colors.length)];
}

showQuestion();