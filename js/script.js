let quizData = [
    {
        question: "Does your organization have specific goals related to gender equality?",
        options: ["yes", "no"]
    },
    {
        question: "Is there any reporting on the level of realization of these goals?",
        options: ["yes", "no"]
    },
    {
        question: "Does your organization have a document regulating gender equality?",
        options: ["yes", "no"]
    },
    {
        question: "Do women and men who have equal or comparable roles have the same pay?",
        options: ["yes", "no"]
    },
    {
        question: "Are work-life balance principles followed in your organization?",
        options: ["yes", "no"]
    },
    {
        question: "Is there gender balance in top management?",
        options: ["yes", "no"]
    },
    {
        question: "Do you have an adequate anti-harassment and reporting policies to ensure employees safety and comfort?",
        options: ["yes", "no"]
    },
    {
        question: "Does your organization introduce these policies to the employees?",
        options: ["yes", "no"]
    },
    {
        question: "Does your company has a budget for Diversity & Inclusion initiatives?",
        options: ["yes", "no"]
    },
    {
        question: "Are there any professional development programs for women in the organization?",
        options: ["yes", "no"]
    },
    {
        question: "Is there any training on the theme of gender bias available for employees and management?",
        options: ["yes", "no"]
    },
    {
        question: "Are recruting procedures unbiased in your organization?",
        options: ["yes", "no"]
    },
    {
        question: "Do you think women and men in your organization have the same right and opportunity to get promoted?",
        options: ["yes", "no"]
    }
];

const quizContainer = document.querySelector(".quiz-container");
const question = document.querySelector(".quiz-container .question");
const options = document.querySelector(".quiz-container .options");
const nextBtn = document.querySelector(".quiz-container .next-btn");
const quizResult = document.querySelector(".quiz-result");
const startBtnContainer = document.querySelector(".start-btn-container");
const startBtn = document.querySelector(".start-btn-container .start-btn");

let questionNumber = 0;
let displayedQuestionNumber = 0;
const MAX_QUESTIONS = 12;

const resetLocalStorage = () => {
    for (let i = 0; i < MAX_QUESTIONS; i++) {
        localStorage.removeItem(`userAnswer_${i}`);
    }
};

resetLocalStorage();

const checkAnswer = (e) => {
    let userAnswer = e.target.textContent;
    localStorage.setItem(`userAnswer_${displayedQuestionNumber}`, userAnswer);

    let allOptions = document.querySelectorAll(".quiz-container .option");
    allOptions.forEach(o => {
        o.classList.add("disabled");
    });

    if (questionNumber === 0) {
        if (userAnswer === "no") {
            questionNumber = 2;
        } else {
            questionNumber = 1;
        }
        displayedQuestionNumber++;
        setTimeout(createQuestion, 500);
        return;
    }

    const currentQuestion = quizData[questionNumber].question;
    if (currentQuestion.includes("anti-harassment")) {
        if (userAnswer === "no") {
            questionNumber += 2;
        } else {
            questionNumber++;
        }
        displayedQuestionNumber++;
        setTimeout(createQuestion, 500);
        return;
    }

    questionNumber++;
    displayedQuestionNumber++;
    setTimeout(createQuestion, 500);
};

const createQuestion = () => {
    if (questionNumber >= quizData.length) {
        displayQuizResult();
        return;
    }

    options.innerHTML = "";
    question.innerHTML = `<span class='question-number'>${displayedQuestionNumber + 1}.</span>${quizData[questionNumber].question}`;

    quizData[questionNumber].options.forEach((o) => {
        const option = document.createElement("button");
        option.classList.add("option");
        option.innerHTML = o;
        option.addEventListener("click", (e) => {
            checkAnswer(e);
        });
        options.appendChild(option);
    });
};

const retakeQuiz = () => {
    questionNumber = 0;
    displayedQuestionNumber = 0;
    resetLocalStorage();

    createQuestion();
    quizResult.style.display = "none";
    quizContainer.style.display = "block";
};

const displayQuizResult = () => {
    quizResult.style.display = "flex";
    quizContainer.style.display = "none";
    quizResult.innerHTML = "";

    // Main Results Heading
    const resultHeading = document.createElement("h1");
    resultHeading.innerHTML = "Results";
    quizResult.appendChild(resultHeading);

    // Level description
    const levelDesc = document.createElement("p");
    levelDesc.innerHTML = "The level of gender equality principles adherence in your organizations is";
    quizResult.appendChild(levelDesc);

    // Progress bar container
    const progressContainer = document.createElement("div");
    progressContainer.style.position = "relative";
    quizResult.appendChild(progressContainer);

    // Progress bar
    const progressBar = document.createElement("div");
    progressBar.classList.add("progress-bar");
    progressContainer.appendChild(progressBar);

    // Progress percentage
    const progressPercentage = document.createElement("div");
    progressPercentage.classList.add("progress-percentage");
    progressContainer.appendChild(progressPercentage);

    // Calculate progress based on Yes answers
    const answers = {};
    for (let i = 0; i < quizData.length; i++) {
        answers[i] = localStorage.getItem(`userAnswer_${i}`);
    }

    let totalPoints = 0;
    const totalQuestions = quizData.length;

    // Calculate points for each answer
    for (let i = 0; i < totalQuestions; i++) {
        if (i === 9 || i === 10) { // Questions 11 and 12 (0-based index)
            if (answers[i] === "no") {
                totalPoints++; // Add point for No answers
            }
        } else {
            if (answers[i] === "yes") {
                totalPoints++; // Add point for Yes answers
            }
        }
    }

    const progressPercent = Math.round((totalPoints / totalQuestions) * 100);
    
    // Set the progress bar width and percentage text
    progressBar.style.setProperty('--progress', `${progressPercent}%`);
    progressPercentage.textContent = `${progressPercent}%`;

    // Plan Heading
    const planHeading = document.createElement("h2");
    if (progressPercent >= 80) {
    planHeading.innerHTML = "Your company is doing great in terms of gender equality, but here are some further suggestions:";
    }
    else{
        planHeading.innerHTML = "Gender equality plan based on your answers:";
    }

    quizResult.appendChild(planHeading);

    // Create recommendations list
    const recommendationsList = document.createElement("ol");
    recommendationsList.classList.add("recommendations");

    // Add recommendations based on answers
    if (answers[0] === "no") {
        recommendationsList.innerHTML += `<li>Provide sufficient data and reporting materials to ensure effective gender equality goals realization</li>`;
    }

    recommendationsList.innerHTML += `<li>Conduct a pay equity audit. Based on the analysis, make changes in compensation policy to promote certain employees who unfairly paid before</li>`;

    recommendationsList.innerHTML += `<li>Conduct an anonymous survey to understand whether employees are not overworked, at the end of the survey, ask what suggestions they could give to improve the situation</li>`;

    if (answers[3] === "no") {
        recommendationsList.innerHTML += `<li>Encourage women promotion to the top-management and their involvement in decision-making process</li>`;
    }

    if (answers[4] === "no") {
        recommendationsList.innerHTML += `<li>Provide a sufficient reporting and anti-harassment policies to prevent harassment on the working place. Make all employees aware of these policies existence and show support for women who were ever facing it</li>`;
    }

    if (answers[4] === "yes") {
        recommendationsList.innerHTML += `<li>Make all employees aware of reporting and anti-harassment policies existence and show support for women who were ever facing it</li>`;
    }

    if (answers[5] === "no") {
        recommendationsList.innerHTML += `<li>Use free resources (UN women etc.) and organize meetings with employees to promote awareness on the theme</li>`;
    }

    if (answers[6] === "no") {
        recommendationsList.innerHTML += `<li>Create professional training within HRM training programs to promote women empowerment and career advancement</li>`;
    }

    if (answers[7] === "yes") {
        recommendationsList.innerHTML += `<li>Provide training on unconscious bias and how to try eliminating it within oneself</li>`;
    }

    if (answers[7] === "no") {
        recommendationsList.innerHTML += `<li>Provide trainings on the theme of gender bias and regularly remind employees about non-discrimination policy</li>`;
    }

    recommendationsList.innerHTML += `<li>Provide special training for HR team about the anti-discrimination principles and state that bias towards candidates of any specific gender should not exist</li>`;
    
    recommendationsList.innerHTML += `<li>Provide anonymous promotion process where directors will not see the candidate's gender and only their contribution to the company is shown</li>`;

    quizResult.appendChild(recommendationsList);

    // Retake button
    const retakeBtn = document.createElement("button");
    retakeBtn.classList.add("retake-btn");
    retakeBtn.innerHTML = 'Take Quiz Again';
    retakeBtn.addEventListener("click", retakeQuiz);
    quizResult.appendChild(retakeBtn);
};

startBtn.addEventListener("click", () => {
    startBtnContainer.style.display = "none";
    quizContainer.style.display = "block";
    questionNumber = 0;
    displayedQuestionNumber = 0;
    createQuestion();
});

