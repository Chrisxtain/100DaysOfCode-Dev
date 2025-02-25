document.addEventListener("DOMContentLoaded", () => {
  const quizData = [
    {
      question: "Which planet is known as the 'Red Planet'?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      answer: "Mars",
    },
    {
      question:
        "What programming language is primarily used for styling web pages?",
      options: ["JavaScript", "Python", "CSS", "HTML"],
      answer: "CSS",
    },
    {
      question: "Who painted the Mona Lisa?",
      options: [
        "Vincent van Gogh",
        "Pablo Picasso",
        "Michelangelo",
        "Leonardo da Vinci",
      ],
      answer: "Leonardo da Vinci",
    },
    {
      question: "Which of these is NOT a JavaScript data type?",
      options: ["Boolean", "Integer", "String", "Object"],
      answer: "Integer",
    },
    {
      question: "What does the acronym DOM stand for in web development?",
      options: [
        "Document Object Model",
        "Digital Ordinance Management",
        "Data Object Manipulation",
        "Document Orientation Method",
      ],
      answer: "Document Object Model",
    },
  ];

  let currentQuestionIndex = 0;
  let score = 0;
  let timeLeft = 60;
  let timerInterval;

  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");
  const scoreContainer = document.getElementById("score-container");
  const finalScoreElement = document.getElementById("final-score");
  const progressBar = document.getElementById("progress-bar");
  const timeLeftElement = document.getElementById("time-left");
  const restartButton = document.getElementById("restart-button");

  function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = "";

    currentQuestion.options.forEach((option) => {
      const button = document.createElement("button");
      button.textContent = option;
      button.classList.add("option-button");
      button.onclick = () => selectOption(option, currentQuestion.answer);
      optionsElement.appendChild(button);
    });

    progressBar.style.width = `${
      ((currentQuestionIndex + 1) / quizData.length) * 100
    }%`;
  }

  function selectOption(selectedOption, correctAnswer) {
    const buttons = document.querySelectorAll(".option-button");
    buttons.forEach((button) => {
      button.disabled = true;

      if (button.textContent === correctAnswer) {
        button.classList.add("correct");
      } else if (
        button.textContent === selectedOption &&
        selectedOption !== correctAnswer
      ) {
        button.classList.add("incorrect");
      }
    });

    if (selectedOption === correctAnswer) {
      score++;
    }

    setTimeout(() => {
      currentQuestionIndex++;
      if (currentQuestionIndex < quizData.length) {
        loadQuestion();
      } else {
        endQuiz();
      }
    }, 1000);
  }

  function endQuiz() {
    questionElement.style.display = "none";
    optionsElement.style.display = "none";
    scoreContainer.style.display = "block";
    finalScoreElement.textContent = `${score}/${quizData.length}`;
    clearInterval(timerInterval);
    saveHighScore();
  }

  function startTimer() {
    timerInterval = setInterval(() => {
      timeLeft--;
      timeLeftElement.textContent = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        endQuiz();
      }
    }, 1000);
  }

  function saveHighScore() {
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.push({ score: score, date: new Date().toISOString() });
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5); // Keep only top 5
    localStorage.setItem("highScores", JSON.stringify(highScores));
  }

  function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 60;
    clearInterval(timerInterval);
    startTimer();
    loadQuestion();
    scoreContainer.style.display = "none";
    questionElement.style.display = "block";
    optionsElement.style.display = "block";
  }

  loadQuestion();
  startTimer();
  restartButton.onclick = restartQuiz;
});
