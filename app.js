const progressBar = document.querySelector(".prgress-bar"),
    progressText = document.querySelector(".progress-text");

const progress = (value) => {
    const percentage = (value / time) * 100;
    progressBar.computedStyleMap.width = `${percentage}%`;
    progressText.innerHTML = `${value}`;

}

let questions = [],
    time = 30,
    score = 0,
    currentQuestions,
    timer;

const startBtn = document.querySelector('.start'),
    numQuestions = document.querySelector('#num-questions'),
    category = document.querySelector('#category'),
    difficulty = document.querySelector('#difficulty'),
    timePerQuestion = document.querySelector('#time'),
    startScreen = document.querySelector('.start-screen'),
    quiz = document.querySelector('.quiz');


const startQuiz = () => {
    const num = numQuestions.value,
        cat = category.value,
        diff = difficulty.value;

    // api url 
    const url = `https://opentdb.com/api.php?amount=${num}&category=${cat}&difficulty=${diff}&type=multiple`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            questions = data.results;
            startScreen.classList.add("hide");
            quiz.classList.remove("hide");
            currentQuestions = 1;
            showQuestion(questions[0]);
        });
}

startBtn.addEventListener('click', startQuiz);

const submitBtn = document.querySelector(".question"),
    nextBtn = document.querySelector(".next");


const showQuestion = (question) => {
    const questionText = document.querySelector(".question"),
        answersWrapper = document.querySelector('.answer-wrapper'),
        questionNumber = document.querySelector(".number");

    questionText.innerHTML = question.question;

    const answers = [...question.incorrect_answers, question.correct_answer.toString(),
    ];

    answers.sort(() => Math.random() - 0.5);
    answersWrapper.innerHTML = "";
    answers.forEach((answer) => {
        answersWrapper.innerHTML += `
            <div class="answer">
            <span class="text">${answer}</span>
            <span class="checkbox" >
                <span class="icon"></span>
            </span>
        </div> `;
    });

    questionNumber.innerHTML = `
        Question <span class="current">${questions.indexOf(question) + 1}</span>
        <span class="total"> / ${questions.length}
    `;
    const answerDiv = document.querySelectorAll(".answer");
    answerDiv.forEach((answer) => {
        if (!answer.classList.contains("checked")) {
            answerDiv.forEach((answer) => {
                answer.classList.remove("selected");
            });

            answer.classList.add("selected");

            submitBtn.disabled = false;
        }
    })
}