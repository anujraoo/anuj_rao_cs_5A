const questions = [
  {
      question: "What is the capital of France?",
      answers: [
          { text: "Paris", correct: true },
          { text: "London", correct: false },
          { text: "Berlin", correct: false },
          { text: "Madrid", correct: false }
      ]
  },
  {
      question: "Who wrote 'To Kill a Mockingbird'?",
      answers: [
          { text: "Harper Lee", correct: true },
          { text: "J.K. Rowling", correct: false },
          { text: "Mark Twain", correct: false },
          { text: "Ernest Hemingway", correct: false }
      ]
  },
  {
      question: "What is the largest planet in our solar system?",
      answers: [
          { text: "Earth", correct: false },
          { text: "Jupiter", correct: true },
          { text: "Saturn", correct: false },
          { text: "Mars", correct: false }
      ]
  }
];

let currentQuestionIndex = 0;
let score = 0;

// Select DOM elements
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const resultContainer = document.getElementById('result-container');
const scoreText = document.getElementById('score-text');
const restartButton = document.getElementById('restart-btn');

// Show a question
function showQuestion(question) {
  questionElement.innerText = question.question;
  answerButtonsElement.innerHTML = ''; // Clear previous answers

  question.answers.forEach(answer => {
      const button = document.createElement('button');
      button.innerText = answer.text;
      button.classList.add('btn');
      if (answer.correct) {
          button.dataset.correct = answer.correct;
      }
      button.addEventListener('click', selectAnswer);
      answerButtonsElement.appendChild(button);
  });
}

// Select an answer
function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct === 'true';

  if (correct) {
      score++;
      selectedButton.classList.add('correct');
  } else {
      selectedButton.classList.add('wrong');
  }

  // Disable other buttons after selection
  Array.from(answerButtonsElement.children).forEach(button => {
      button.disabled = true;
      if (button.dataset.correct === 'true') {
          button.classList.add('correct');
      }
  });

  nextButton.style.display = 'block';
}

// Show the next question
function showNextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
      showQuestion(questions[currentQuestionIndex]);
      nextButton.style.display = 'none';
  } else {
      showScore();
  }
}

// Show score
function showScore() {
  questionElement.innerText = "Quiz Completed!";
  scoreText.innerText = `Your Score: ${score} / ${questions.length}`;
  resultContainer.style.display = 'block';
  nextButton.style.display = 'none';
  answerButtonsElement.style.display = 'none';
}

// Restart quiz
function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  resultContainer.style.display = 'none';
  answerButtonsElement.style.display = 'flex';
  showQuestion(questions[currentQuestionIndex]);
}

nextButton.addEventListener('click', showNextQuestion);
restartButton.addEventListener('click', restartQuiz);

// Initialize Quiz
showQuestion(questions[currentQuestionIndex]);
