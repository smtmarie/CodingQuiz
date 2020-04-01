var questions =
    [
        {
            question: "Commonly used data types DO NOT include:",
            choices: ["strings", "booleans", "alerts", "numbers"],
            answer: "alerts"
        },

        {
            question: "The condition in an if / else statement is enclosed within ____.",
            choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
            answer: "parentheses"
        },

        {
            question: "Arrays in JavaScript can be used to store ____.",
            choices: [
                "numbers and strings",
                "other arrays",
                "booleans",
                "all of the above"
            ],
            answer: "all of the above"
        },

        {
            question:
                "String values must be enclosed within ____ when being assigned to variables.",
            choices: ["commas", "curly brackets", "quotes", "parentheses"],
            answer: "quotes"
        },

        {
            question:
                "A very useful tool used during development and debugging for printing content to the debugger is:",
            choices: ["JavaScript", "terminal / bash", "for loops", "console.log"],
            answer: "console.log"
        }
    ];


var currentQuestionIndex = 0;
var time = questions.length * 15
var score = 0;
var timerId;


var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");



function startQuiz() {

    var startScreenEl = document.getElementById("start-screen");
    startScreenEl.setAttribute("class", "hide");
    questionsEl.removeAttribute("class");
    timerId = setInterval(clockTick, 1000);
    timerEl.textContent = time
    getQuestion();

}

function getQuestion() {
    var currentQuestion = questions[currentQuestionIndex]
    var titleEl = document.getElementById("question-title")
    titleEl.textContent = currentQuestion.question;
    choicesEl.innerHTML = "";
    currentQuestion.choices.forEach(function (choice, i) {
        var choiceNode = document.createElement("button");
        choiceNode.setAttribute("class", "choice");
        choiceNode.setAttribute("value", choice);
        choiceNode.textContent = i + 1 + ". " + choice;
        choiceNode.onclick = questionClick;
        choicesEl.appendChild(choiceNode);
    });

}

function questionClick() {
    if (this.value !== questions[currentQuestionIndex].answer) {

        time = time - 15;

        if (time < 0) {

            time = 0;

        }

        timerEl.textContent = time
        feedbackEl.textContent = "wrong"

    } else {

        feedbackEl.textContent = "correct"
    }

    feedbackEl.setAttribute("class", "feedback")
    setTimeout(function () {

        feedbackEl.setAttribute("class", "feedback hide")

    }, 1000)

    currentQuestionIndex++

    if (currentQuestionIndex === questions.length) {

        quizEnd()

    }

    else {
        getQuestion()

    }
}

function quizEnd() {

    clearInterval(timerId)
    var startScreenEl = document.getElementById("start-screen")
    startScreenEl.removeAttribute("class")
    var finalScoreEl = document.getElementById("end-screen")
    finalScoreEl.textContent.time = time
    questionsEl.setAttribute("class", "hide")
}

function clockTick() {

    time--;
    timerEl.textContent = time
    if (time <= 0) {

        quizEnd();
    }

}

function viewHighScore() {

    var initials = initialsEl.value.trim();

    if (initials !== " ") {

        var highScores = JSON.parse(window.localStorage.getItem(highScores)) || []

        var newScore = {
            score: time,
            initials: initials
        };
        highScores.push(newScore);
        window.localStorage.setItem("highScores", JSON.stringify(highScores));

    }

}

function checkforEnter(event) {
    if (event.key === "Enter") {

        saveViewHighScore();

    }
}


startBtn.addEventListener("click", startQuiz);
submitBtn.onclick = viewHighScore;
initialsEl.onkeyup = checkforEnter;

