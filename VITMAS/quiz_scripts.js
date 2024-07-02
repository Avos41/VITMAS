const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');
const timerContainer = document.getElementById('timer');
let timer = 300;

const myQuestions = [
    {
        question: "What will be the value of x + y + z if cos-1 x + cos-1 y + cos-1 z = 3π?",
        answers: {
            a: "-3",
            b: "3",
            c: "1"
        },
        correctAnswer: "a"
    },
    {
        question: "Integrate (x2+9)e2xdx",
        answers:{
            a: " e2x2(x2+x−354)+C",
            b: " e2x2(x3+x−334)+C",
            c: "ex2(x2+x−254)+C"
        },
        correctAnswer: "a"
    },
    {
        question: "Differentiate 9^(tan⁡3x) with respect to x.",
        answer:
        {
            a: "9tan⁡3x (3 log⁡9 sec2⁡x)",
            b: "-9tan⁡3x (3 log⁡9 sec2⁡x)",
            c: " 9tan⁡3x (3 log⁡3 sec2⁡x)",
        },
        correctAnswer: "a"
    }
];

function buildQuiz() {
    const output = [];

    myQuestions.forEach((currentQuestion, questionNumber) => {
        const answers = [];

        for (letter in currentQuestion.answers) {
            answers.push(
                `<label>
                    <input type="radio" name="question${questionNumber}" value="${letter}">
                    ${letter} :
                    ${currentQuestion.answers[letter]}
                </label>`
            );
        }

        output.push(
            `<div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join('')} </div>`
        );
    });

    quizContainer.innerHTML = output.join('');
}

function showResults() {
    const answerContainers = quizContainer.querySelectorAll('.answers');

    let numCorrect = 0;

    myQuestions.forEach((currentQuestion, questionNumber) => {
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        if (userAnswer === currentQuestion.correctAnswer) {
            numCorrect++;
            answerContainers[questionNumber].style.color = 'lightgreen';
        } else {
            answerContainers[questionNumber].style.color = 'red';
        }
    });

    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
}

function startTimer() {
    const interval = setInterval(() => {
        timer--;
        timerContainer.textContent = `Time Left: ${timer}s`;

        if (timer <= 0) {
            clearInterval(interval);
            showResults();
        }
    }, 1000);
}

buildQuiz();
startTimer();

submitButton.addEventListener('click', showResults);
