const question = document.getElementById("question");
const options = Array.from(document.getElementsByClassName("option-text"));
const questionCounterText = document.querySelector('.questionCounter');
const scoreText = document.querySelector(".score");
const nextBtn  = document.querySelector('.nextBtn');

let currentQuestion = {}
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    q: "Inside which HTML element do we put the JavaScript??",
    option1: "<script>",
    option2: "<javascript>",
    option3: "<js>",
    option4: "<scripting>",
    answer: 1
  },
  {
    q:
      "What is the correct syntax for referring to an external script called 'xxx.js'?",
    option1: "<script href='xxx.js'>",
    option2: "<script name='xxx.js'>",
    option3: "<script src='xxx.js'>",
    option4: "<script file='xxx.js'>",
    answer: 3
  },
  {
    q: " How do you write 'Hello World' in an alert box?",
    option1: "msgBox('Hello World');",
    option2: "alertBox('Hello World');",
    option3: "msg('Hello World');",
    option4: "alert('Hello World');",
    answer: 4
  }
];


// Constants
const ANSWER_POINTS = 20;
const MAX_QUESTIONS = 3;

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
    localStorage.setItem('mostRecentScore',score);
    // Go to the game over page
    return window.location.assign('/game_over.html'); 
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
  
    setTimeout(function showWrongAnswer(){
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
  getNewQuestions();
  e.preventDefault();
})

startGame();