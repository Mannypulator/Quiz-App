const playerName = document.getElementById("playerName");
const scoreBtn = document.querySelector('.saveScore');
const finalScore = document.querySelector(".finalScore");
console.log(finalScore);
const mostRecentScore = localStorage.getItem("mostRecentScore");

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const MAX_HIGH_SCORES = 5;

finalScore.innerText = mostRecentScore;

playerName.addEventListener("keyup", function() {
  //disable score button if nothing is typed in
  scoreBtn.disabled = !playerName.value;
});

function saveHighScore(e) {
  console.log("clicked the save button!");
  e.preventDefault();
  const score = {
    score: mostRecentScore,
    name: playerName.value
  };
  highScores.push(score);
  highScores.sort((a, b) => b.score - a.score);
  highScores.splice(5);

  localStorage.setItem("highScores", JSON.stringify(highScores));
  window.location.assign("/");
};
