const question = document.getElementById("question");
const options = Array.from(document.getElementsByClassName("option-text"));
const questionCounterText = document.querySelector('.questionCounter');
const scoreText = document.querySelector(".score");
const nextBtn  = document.querySelector('.nextBtn');
const finalScore = document.querySelector('.finalScore');

let currentQuestion = {}
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    q: "How to check if git is available on your system?",
    option1: "git --version",
    option2: "git version",
    option3: "git --v",
    option4: "None of the above",
    answer: 1
  },
  {
    q:"How to add a file to staging area?",
    option1: "git add .",
    option2: "git add file",
    option3: "git add . file",
    option4: "All of the above",
    answer: 2
  },
  {
    q: " How to initialize a new Git repository?",
    option1: "git inIt",
    option2: "git --init",
    option3: "git init project",
    option4: "None of the above",
    answer: 4
  },
  {
    q: " How to remove a file from staging area?",
    option1: "git reset",
    option2: "git reset HEAD",
    option3: "git reset HEAD --file",
    option4: "All of the above",
    answer: 3
  },
  {
    q: "How to make a commit?",
    option1: "git commit -m 'initial commit'",
    option2: "git commit 'initial commit'",
    option3: "git init commit",
    option4: "None of the above",
    answer: 1
  }
];


// Constants
const ANSWER_POINTS = 20;
const MAX_QUESTIONS = 5;

function startGame() {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  console.log(availableQuestions);
  getNewQuestions();
}
function getNewQuestions() {
  //If it has used up all the questions, Game over
  if(availableQuestions.length === 0 ||questionCounter >= MAX_QUESTIONS){
    localStorage.setItem("totalScore",score);
    // Go to the game over page
    return window.location.assign('end.html'); 
  }
  questionCounter++;
  questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.q;

  //load all the options
  options.forEach(function(option){
    const id = option.dataset["id"];
    option.innerText = currentQuestion['option'+ id];
  });
  console.log(availableQuestions);
  //Takes out question from the array
  availableQuestions.splice(questionIndex, 1);
  console.log(availableQuestions);

  acceptingAnswers = true;
}

options.forEach(function(option){
  option.addEventListener('click', function(e){
    //if we are not accepting answers
    if(!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset['id'];
    // Check if selected answer matches given answer
    const classToApply = selectedAnswer == currentQuestion.answer ?'correct': 'incorrect';

    if (classToApply === "correct") {
      calculateScore(ANSWER_POINTS);
    }

    selectedChoice.parentElement.classList.add(classToApply);
  
    setTimeout(function(){
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestions();
    },1000);

  

  });
});
function calculateScore(currentScore){
  score += currentScore;
  scoreText.innerText = score;
}

nextBtn.addEventListener('click',function(e){
  if(!acceptingAnswers) {
      getNewQuestions();
      e.preventDefault();
  }
  alert('Please select an option!');

})

startGame();