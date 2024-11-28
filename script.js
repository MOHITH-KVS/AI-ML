// Array of Questions and Options
const questions = [
    {
        text: "On a scale of 1-10, how quiet is your sleeping environment?",
        options: ["1. 1-3 (Noisy)", "2. 4-7 (Moderately Quiet)", "3. 8-10 (Very Quiet)"],
    },
    {
        text: "How many caffeinated drinks (coffee, tea, energy drinks) do you have per day?",
        options: ["1. 3 or more drinks", "2. 1-2 drinks", "3. None"],
    },
    {
        text: "How much screen time do you have in the hour before sleep?",
        options: ["1. More than 1 hour", "2. 30 minutes to 1 hour", "3. Less than 30 minutes"],
    },
    {
        text: "Do you maintain a consistent sleep-wake schedule?",
        options: ["1. No, my schedule varies", "2. Mostly, but weekends differ", "3. Yes, it is consistent"],
    },
    {
        text: "How many hours of sleep do you get on average?",
        options: ["Less than 6 hours", "6-8 hours", "More than 8 hours"],
    },
    {
        text: "On a scale of 1-10, how stressed do you feel before bed?",
        options: ["1-3 (Low Stress)", "4-6 (Moderate Stress)", "7-10 (High Stress)"],
    },
    {
        text: "How many days per week do you exercise?",
        options: ["0-1 days", "2-3 days", "4 or more days"],
    },
    {
        text: "On a scale of 1-10, how healthy is your diet?",
        options: ["1-3 (Poor Diet)", "4-7 (Moderate Diet)", "8-10 (Healthy Diet)"],
    }
];

// Variables to track the current question, selected answer, and all answers
let currentQuestionIndex = 0;
let selectedAnswer = null;
let answers = new Array(questions.length).fill(null); // Array to store answers

// DOM Elements
const questionElement = document.getElementById("question");
const optionsContainer = document.querySelector(".options");
const nextButton = document.getElementById("next-btn");
const backButton = document.getElementById("back-btn");

// Function to Load a Question
function loadQuestion(index) {
    const question = questions[index];
    questionElement.textContent = question.text;
    optionsContainer.innerHTML = ""; // Clear previous options

    // Pre-select the previous answer if available
    question.options.forEach((option) => {
        const button = document.createElement("button");
        button.classList.add("option-btn");
        button.textContent = option;
        button.setAttribute("data-value", option);

        // Mark the previously selected answer (if any)
        if (answers[index] === option) {
            button.classList.add("selected");
        }

        optionsContainer.appendChild(button);

        // Add click listener for each option button
        button.addEventListener("click", () => {
            document
                .querySelectorAll(".option-btn")
                .forEach((btn) => btn.classList.remove("selected"));
            button.classList.add("selected");
            selectedAnswer = button.getAttribute("data-value");
            answers[index] = selectedAnswer; // Store the answer for this question
            nextButton.disabled = false; // Enable the "Next" button
        });
    });

    // Enable/Disable Back Button
    backButton.disabled = currentQuestionIndex === 0;

    // Disable "Next" button initially
    nextButton.disabled = true;
}

// Function to Handle Next Button Click
nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
        selectedAnswer = null;
    } else {
        displayFinalOptions();
    }
});

// Function to Handle Back Button Click
backButton.addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion(currentQuestionIndex);
        selectedAnswer = null;
    }
});

// Function to Display Final Options
function displayFinalOptions() {
    questionElement.textContent = "Thank you for completing the questionnaire! Choose an option below:";
    optionsContainer.innerHTML = `
        <button class="final-btn" onclick="giveAdvice()">Give me advices</button>
        <button class="final-btn" onclick="analyzeSleep()">Analyze my sleep</button>
        <button class="final-btn" onclick="both()">Both 1 & 2</button>
        <button class="final-btn" onclick="downloadReport()">Download my report</button>
    `;
    nextButton.style.display = "none"; // Hide the "Next" button
    backButton.style.display = "none"; // Hide the "Back" button
}

// Functions for Each Final Option
function giveAdvice() {
    alert("Here are some tips to improve your sleep quality!");
}

function analyzeSleep() {
    alert("Analyzing your sleep patterns...");
}

function both() {
    alert("Providing advice and analyzing your sleep...");
}

function downloadReport() {
    alert("Your sleep report is being generated!");
}

// Initialize the First Question
loadQuestion(currentQuestionIndex);
