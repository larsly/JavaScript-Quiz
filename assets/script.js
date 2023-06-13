let currentQuestion = 0;
let counter = 10;
let quizStarted = false;
var timerBtnEl = document.getElementById('start-quiz');
let questionTextEl = document.getElementById("question-text");
let answerEls = document.getElementsByClassName("answer");
var submitBtnEl = document.getElementById('submit');
var displayTimer = document.getElementById('timer');
var quizDisplay = document.getElementById("quiz");
var formDisplay = document.getElementById("highscore");
var scoreSubmit = document.getElementById("send");
var initialsEl = document.getElementById("formGroupExampleInput");
var highscoreDisplay = document.getElementById("list");

function timer(amount) {
    if (quizStarted) {
        counter -= amount;
        displayTimer.innerText = counter;
        if (counter <= 0) {
            quizStarted = false;
            counter = 0;
        }
    }
}

timerBtnEl.addEventListener('click', function(event) {
    event.preventDefault();

    if (quizStarted) {
        return;
    }
    quizStarted = true;
    setInterval(function() {timer(1)}, 1000);
    renderQuestion();
    hide();
});

quizDisplay.style.display = "none";

function hide() {
    toggleDisplay(timerBtnEl);
    toggleDisplay(quizDisplay);
  };

function toggleDisplay(element) {
    if (element.style.display === "none") {
        element.style.display = "block";
      } else {
        element.style.display = "none";
      }
};

function renderQuestion() {
    questionTextEl.innerText = questions[currentQuestion].text;
    for (let i=0; i < 4; i++) {
        answerEls[i].innerText = questions[currentQuestion].answers[i];
    }
};

submitBtnEl.addEventListener('click', function(event){
    event.preventDefault();
    if ([... document.querySelectorAll("input[name=answer]")].findIndex(e=>e.checked) != questions[currentQuestion].correctAnswer) {
        timer(5);
    }
    currentQuestion++;
    if (currentQuestion >= questions.length) {
        endQuiz();
    } else {
        renderQuestion();
    }
});

formDisplay.style.display = "none";

function endQuiz() {
    quizStarted = false;
    toggleDisplay(quizDisplay);
    toggleDisplay(formDisplay);
}

function saveScoreToStorage(scores) {
    localStorage.setItem('scores', JSON.stringify(scores));
}

function printScoreData() {
    var scores = readScoresFromStorage();
    for (var i = 0; i < scores.length; i++) {
        console.log(scores[i].initials);
        console.log(scores[i].scores);
        var userScore = document.createElement("p");
        userScore.innerText = `${scores[i].initials} - ${scores[i].scores}`;
        highscoreDisplay.appendChild(userScore);
};
}


function handleScoresFormSubmit(event) {
    event.preventDefault();
    var newScore = {
        initials: initialsEl.value,
        scores: counter,
    };
    var scores = readScoresFromStorage();
    scores.push(newScore);
    saveScoreToStorage(scores);
    printScoreData();
}

function readScoresFromStorage() {
    var scores = localStorage.getItem('scores');
    if (scores) {
        scores = JSON.parse(scores);
    } else {
        scores = [];
    }
    return scores;
}

scoreSubmit.addEventListener('click', handleScoresFormSubmit);
