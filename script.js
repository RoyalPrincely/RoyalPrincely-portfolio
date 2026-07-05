// Minimal, robust quiz logic with accessibility guards

document.addEventListener("DOMContentLoaded", () => {
  const questionElement = document.getElementById("question");
  const answerButtonsElement = document.getElementById("answer-buttons");
  const nextButton = document.getElementById("next-btn");
  const restartButton = document.getElementById("restart-btn");

  if (
    !questionElement ||
    !answerButtonsElement ||
    !nextButton ||
    !restartButton
  ) {
    // Required quiz elements missing — silently abort to avoid runtime errors
    return;
  }

  let currentQuestionIndex = 0;
  let score = 0;

  const questions = [
    {
      question: "What is HTML?",
      answers: [
        { text: "A programming language", correct: false },
        { text: "A markup language", correct: true },
        { text: "A database", correct: false },
        { text: "A styling language", correct: false },
      ],
    },
    {
      question: "Which keyword declares a constant in JavaScript?",
      answers: [
        { text: "var", correct: false },
        { text: "let", correct: false },
        { text: "const", correct: true },
        { text: "function", correct: false },
      ],
    },
    {
      question: "Which Python frameworks are popular for web development?",
      answers: [
        { text: "Django", correct: false },
        { text: "Flask", correct: false },
        { text: "Django and Flask", correct: true },
        { text: "NumPy", correct: false },
      ],
    },
    {
      question: "What is debugging?",
      answers: [
        { text: "Finding and fixing errors in code", correct: true },
        { text: "Writing new features", correct: false },
        { text: "Deploying software", correct: false },
        { text: "Optimizing performance only", correct: false },
      ],
    },
    {
      question: "How do you print Hello World in Python?",
      answers: [
        { text: 'print("Hello World")', correct: true },
        { text: 'say("Hello World")', correct: false },
        { text: 'echo "Hello World"', correct: false },
        { text: 'console.log("Hello World")', correct: false },
      ],
    },
  ];

  function startGame() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.classList.add("hide");
    restartButton.classList.add("hide");
    showQuestion(questions[currentQuestionIndex]);
  }

  function showQuestion(q) {
    questionElement.textContent = q.question;
    answerButtonsElement.innerHTML = "";
    q.answers.forEach((answer) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "btn";
      button.textContent = answer.text;
      button.dataset.correct = answer.correct ? "true" : "false";
      button.setAttribute("aria-pressed", "false");
      button.addEventListener("click", selectAnswer);
      // keyboard support: allow Enter/Space to select when focused
      button.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          button.click();
        }
      });
      answerButtonsElement.appendChild(button);
    });
  }

  function selectAnswer(e) {
    const selected = e.currentTarget;
    const correct = selected.dataset.correct === "true";
    if (correct) {
      score++;
      selected.classList.add("correct");
    } else {
      selected.classList.add("wrong");
    }

    Array.from(answerButtonsElement.children).forEach((btn) => {
      btn.disabled = true;
      if (btn.dataset.correct === "true") btn.classList.add("correct");
    });

    nextButton.classList.remove("hide");
  }

  function setNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion(questions[currentQuestionIndex]);
      nextButton.classList.add("hide");
    } else {
      endQuiz();
    }
  }

  function endQuiz() {
    questionElement.textContent = `Quiz finished — score: ${score} / ${questions.length}`;
    answerButtonsElement.innerHTML = "";
    nextButton.classList.add("hide");
    restartButton.classList.remove("hide");
  }

  nextButton.addEventListener("click", setNextQuestion);
  restartButton.addEventListener("click", startGame);

  // Start automatically
  startGame();
});
