window.onload = function () {
  console.log("All pages and resources are fully loaded") 
  function greet() {
    console.log("Hello, I am carl, the owner of this website")
  }
  greet()
}


window.addEventListener('load', function() {
  console.log("Another function executed after the page is fully loaded.");
});

try {
 
} catch (error) {
  console.error(error.message)
} finally {
  console.log("Worked!")
}


const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const restartButton = document.getElementById('restart-btn');

let currentQuestionIndex = 0;
let score = 0;

const questions = [
  {
    question: 'What is html?',
    answers: [
      { text: 'programming language', correct: false },
      { text: 'A coding language', correct: false },
      { text: 'An markup language', correct: true },
      { text: 'I dont know', correct: false }
    ]
  },
  {
    question: 'Which keyword is used to declare a constant in JavaScript?',
    answers: [
      { text: 'var', correct: false },
      { text: 'const', correct: true },
      { text: 'let', correct: false },
      { text: 'function', correct: false }
    ]
  },
  {
    question: 'Which popular framework is used for web development in Python?',
    answers: [
      { text: 'Django', correct: false },
      { text: 'Django and Flask', correct: true },
      { text: 'Flask', correct: false },
      { text: 'Numpy', correct: false }
    ]
  },
  {
    question: 'What is debugging?',
    answers: [
    { text: 'The process of finding and resolving errors or "bugs" in a computer program.', correct: true},
      { text: 'The process of writing new code for a program.', correct: false},
      { text: 'The process of deploying a program to a server', correct: false},
      { text: 'The process of optimizing a program performance', correct: false}
    ]
  },
  {
    question: 'How to write a basic Hello World Program?',
    answers: [
      { text: 'print("Hello World")', correct: true},
      { text: 'say("Hello World")', correct: false},
      { text: 'write("Hello World")', correct: false},
      { text: 'basic("Hello World")', correct: false}
    ]
  }
];

function startGame() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.classList.add('hide');
  restartButton.classList.add('hide');
  showQuestion(questions[currentQuestionIndex]);
}

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

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct === 'true';
  if (correct) {
    score++;
    selectedButton.classList.add('correct');
  } else {
    selectedButton.classList.add('wrong');
  }
  Array.from(answerButtonsElement.children).forEach(button => {
    if (button.dataset.correct === 'true') {
      button.classList.add('correct');
    }
    button.removeEventListener('click', selectAnswer); // Disable further clicks
  });
  nextButton.classList.remove('hide');
}

function setNextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion(questions[currentQuestionIndex]);
    nextButton.classList.add('hide');
  } else {
    endQuiz();
  }
}

function endQuiz() {
  questionElement.innerText = `Quiz Finished! Your score: ${score} out of ${questions.length}`;
  answerButtonsElement.innerHTML = '';
  nextButton.classList.add('hide');
  restartButton.classList.remove('hide');
}

nextButton.addEventListener('click', setNextQuestion);
restartButton.addEventListener('click', startGame);

startGame();
