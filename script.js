const questions = [
  {
    question: "Which is the largest animal in the world?",
    answers: [
      { text: "Shark", correct: false },
      { text: "Blue whale", correct: true },
      { text: "Elephant", correct: false },
      { text: "Giraffe", correct: false },
    ],
  },
  {
    question: "Which is the smallest country in the world?",
    answers: [
      { text: "Vatican City", correct: true },
      { text: "Bhutan", correct: false },
      { text: "Nepal", correct: false },
      { text: "Shri Lanke", correct: false },
    ],
  },
  {
    question: "Which is the largest desert in the world?",
    answers: [
      { text: "Kalahari", correct: false },
      { text: "Gobi", correct: false },
      { text: "Sahara", correct: false },
      { text: "Antractica", correct: true },
    ],
  },
  {
    question: "Which is the smallest continent in the world?",
    answers: [
      { text: "Asia", correct: false },
      { text: "Australia", correct: true },
      { text: "Arctic", correct: false },
      { text: "Africa", correct: false },
    ],
  },
];

const question = document.getElementById("question");
const answerBtns = document.getElementById("answerBtns");
const nextBtn = document.getElementById("nextBtn");

let currentQustionIndex = 0;
let score = 0;

function startQuiz() {
  currentQustionIndex = 0;
  score = 0;
  nextBtn.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQustionIndex];
  let questionNo = currentQustionIndex + 1;
  question.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerBtns.appendChild(button);
    if(answer.correct)
    {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer)


  });
}

function resetState() {
  nextBtn.style.display = "none";

  while (answerBtns.firstChild) {
    answerBtns.removeChild(answerBtns.firstChild);
  }
}

function selectAnswer(e)
{
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";

  if(isCorrect)
  {
    selectedBtn.classList.add("correct");
    score++;
  }
  else
  {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerBtns.children).forEach(button => {
    if(button.dataset.correct === "true")
    {
      button.classList.add("correct");
    }
    button.disabled = true;

    nextBtn.style.display = "block"
  })


}
function showScore()
{
  resetState();
  question.innerHTML = `You scored ${score} out of ${questions.length}`;
  nextBtn.innerHTML = "Play Again";
  nextBtn.style.display = "block";

}

function handleNextButton()
{
  currentQustionIndex++;
  if(currentQustionIndex < questions.length)
  {
    showQuestion();
  }
  else
  {
    showScore();
  }

}

nextBtn.addEventListener("click", ()=>{
  if(currentQustionIndex < questions.length)
  {
    handleNextButton()
  }
  else
  {
    startQuiz();
  }
})

startQuiz();
