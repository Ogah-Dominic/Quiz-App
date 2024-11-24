const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Lisbon"],
        answer: 2, // Index of the correct answer
    },
    {
        question: "Which language runs in a web browser?",
        options: ["Java", "C", "Python", "JavaScript"],
        answer: 3,
    },
    {
        question: "What does HTML stand for?",
        options: [
            "HyperText Markup Language",
            "Home Tool Markup Language",
            "Hyperlinks and Text Markup Language",
            "None of the above",
        ],
        answer: 0,
    },
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const feedbackEl = document.createElement("div"); // Create a feedback element
const nextBtn = document.getElementById("next-btn");
const scoreContainer = document.getElementById("score-container");
const quizContainer = document.getElementById("quiz");
const scoreEl = document.getElementById("score");

// Add feedback element below options
optionsEl.after(feedbackEl);

function loadQuestion() {
    const currentQuiz = quizData[currentQuestion];
    questionEl.textContent = currentQuiz.question;
    optionsEl.innerHTML = "";
    feedbackEl.textContent = ""; // Clear feedback for the new question

    currentQuiz.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.onclick = () => selectAnswer(index);
        optionsEl.appendChild(button);
    });

    nextBtn.style.display = "none";
}

function selectAnswer(selectedIndex) {
    const currentQuiz = quizData[currentQuestion];
    const buttons = optionsEl.querySelectorAll("button");

    buttons.forEach((button, index) => {
        if (index === currentQuiz.answer) {
            button.style.backgroundColor = "green";
        } else {
            button.style.backgroundColor = "red";
        }
        button.disabled = true;
    });

    // Provide feedback based on the answer
    if (selectedIndex === currentQuiz.answer) {
        feedbackEl.textContent = "Correct!";
        feedbackEl.style.color = "green";
        score++;
    } else {
        feedbackEl.textContent = "Wrong!";
        feedbackEl.style.color = "red";
    }

    nextBtn.style.display = "block";
}

function nextQuestion() {
    currentQuestion++;

    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    quizContainer.style.display = "none";
    scoreContainer.style.display = "block";
    scoreEl.textContent = `Your score: ${score} / ${quizData.length}`;
}

function startQuiz() {
    currentQuestion = 0;
    score = 0;
    quizContainer.style.display = "block";
    scoreContainer.style.display = "none";
    loadQuestion();
}

// Initialize the quiz
nextBtn.onclick = nextQuestion;
startQuiz();
