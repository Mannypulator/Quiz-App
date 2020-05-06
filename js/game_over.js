const finalScore = document.querySelector('.final-score');
const totalScore = localStorage.getItem('totalScore');
finalScore.innerText = totalScore;