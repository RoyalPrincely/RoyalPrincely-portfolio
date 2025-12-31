document.addEventListener('DOMContentLoaded', () => {
  console.log('All pages and resources are fully loaded')
  console.log('Welcome!')

  // Cache DOM elements
  const questionElement = document.getElementById('question')
  const answerButtonsElement = document.getElementById('answer-buttons')
  const nextButton = document.getElementById('next-btn')
  const restartButton = document.getElementById('restart-btn')

  // Exit early if quiz elements don't exist (e.g., on FAQ page)
  if (
    !questionElement ||
    !answerButtonsElement ||
    !nextButton ||
    !restartButton
  ) {
    return
  }

  // Quiz state
  let currentQuestionIndex = 0
  let score = 0
  let hasAnswered = false

  // Quiz questions data
  const questions = Object.freeze([
    {
      question: 'What is HTML?',
      answers: [
        { text: 'A programming language', correct: false },
        { text: 'A coding language', correct: false },
        { text: 'A markup language', correct: true },
        { text: "I don't know", correct: false }
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
      question:
        'Which popular framework is used for web development in Python?',
      answers: [
        { text: 'Django', correct: false },
        { text: 'Django and Flask', correct: true },
        { text: 'Flask', correct: false },
        { text: 'NumPy', correct: false }
      ]
    },
    {
      question: 'What is debugging?',
      answers: [
        {
          text: 'The process of finding and resolving errors or "bugs" in a computer program.',
          correct: true
        },
        {
          text: 'The process of writing new code for a program.',
          correct: false
        },
        {
          text: 'The process of deploying a program to a server',
          correct: false
        },
        {
          text: 'The process of optimizing program performance',
          correct: false
        }
      ]
    },
    {
      question: 'How to write a basic Hello World program?',
      answers: [
        { text: 'print("Hello World")', correct: true },
        { text: 'say("Hello World")', correct: false },
        { text: 'write("Hello World")', correct: false },
        { text: 'basic("Hello World")', correct: false }
      ]
    }
  ])

  // Create a document fragment for better performance when adding multiple elements
  function createAnswerButtons (answers) {
    const fragment = document.createDocumentFragment()
    answers.forEach((answer) => {
      const button = document.createElement('button')
      button.textContent = answer.text
      button.classList.add('btn')
      button.type = 'button'
      if (answer.correct) {
        button.dataset.correct = 'true'
      }
      fragment.appendChild(button)
    })
    return fragment
  }

  function startGame () {
    currentQuestionIndex = 0
    score = 0
    hasAnswered = false
    nextButton.classList.add('hide')
    restartButton.classList.add('hide')
    showQuestion(questions[currentQuestionIndex])
  }

  function showQuestion (question) {
    hasAnswered = false
    questionElement.textContent = question.question
    answerButtonsElement.innerHTML = ''
    answerButtonsElement.appendChild(createAnswerButtons(question.answers))
  }

  // Use event delegation instead of adding listeners to each button
  function handleAnswerClick (e) {
    const selectedButton = e.target

    // Only handle clicks on buttons, not the container
    if (!selectedButton.matches('.btn') || hasAnswered) {
      return
    }

    hasAnswered = true
    const correct = selectedButton.dataset.correct === 'true'

    if (correct) {
      score++
      selectedButton.classList.add('correct')
    } else {
      selectedButton.classList.add('wrong')
    }

    // Highlight correct answer and disable all buttons visually
    const buttons = answerButtonsElement.children
    for (let i = 0; i < buttons.length; i++) {
      if (buttons[i].dataset.correct === 'true') {
        buttons[i].classList.add('correct')
      }
      buttons[i].disabled = true
    }

    nextButton.classList.remove('hide')
  }

  function setNextQuestion () {
    currentQuestionIndex++
    if (currentQuestionIndex < questions.length) {
      showQuestion(questions[currentQuestionIndex])
      nextButton.classList.add('hide')
    } else {
      endQuiz()
    }
  }

  function endQuiz () {
    const percentage = Math.round((score / questions.length) * 100)
    questionElement.textContent = `Quiz Finished! Your score: ${score} out of ${questions.length} (${percentage}%)`
    answerButtonsElement.innerHTML = ''
    nextButton.classList.add('hide')
    restartButton.classList.remove('hide')
  }

  // Event listeners using delegation for better performance
  answerButtonsElement.addEventListener('click', handleAnswerClick)
  nextButton.addEventListener('click', setNextQuestion)
  restartButton.addEventListener('click', startGame)

  // Initialize quiz
  startGame()
})
