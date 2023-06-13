// setInterval(myTimer, 1000);

// function myTimer() {
//   const d = new Date();
//   document.getElementById("demo").innerHTML = d.toLocaleTimeString();
// }

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
    toggleDisplay(scoreDisplay);
    toggleDisplay(formDisplay);
}


// display timer
// display correct answer
// invisible question before quiz starts
// end quiz
// high score = time left (save with local storage)
// nice style :)




// setInterval(timer, 1000);

// timer(5); - decrement