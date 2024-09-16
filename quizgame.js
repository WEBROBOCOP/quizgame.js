const readline = require('readline');
const prompt = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let questions = [
  {
    question: "What is JavaScript?",
    correct: "A programming language",
    choices: ["A type of coffee", "A programming language", "A web browser"],
    level: "easy",
    topic: "programming",
  },
  {
    question: "What is a function in JavaScript?",
    correct: "A reusable block of code",
    choices: ["A type of variable", "A reusable block of code", "A mathematical operation"],
    level: "easy",
    topic: "programming",
  },
  {
    question: "What will be the output of solve([44, 1, 22, 111], 5)?",
    correct: "[111, 44, 1, 22]",
    choices: ["[44, 1, 22, 111]", "[111, 44, 1, 22]", "[22, 111, 44, 1]"],
    level: "medium",
    topic: "programming",
  },
  {
    question: "When an operator’s value is NULL, the typeof returned by the unary operator is:",
    correct: "[OBJECT]",
    choices: ["[OBJECT]", "[Undefine]", "[Boolean]"],
    level: "medium",
    topic: "programming",
  },
  
  // Add more questions here...
];

let score = 0;
let scoreHistory = [];

function shuffleArray(array) {
  let copyArray = [...array];
  let resultArray = [];
  let length = array.length;
  for (let i = 0; i < length; i++) {
    let randomIndex = Math.floor(Math.random() * copyArray.length);
    let randomItem = copyArray[randomIndex];
    resultArray.push(randomItem);
    copyArray.splice(randomIndex, 1);
  }
  return resultArray;
}

function timer(duration, callback) {
  let seconds = duration;
  console.log(`You have ${seconds} seconds to answer.`);
  let interval = setInterval(() => {
    seconds -= 1;
    process.stdout.write(`\rTime left: ${seconds} seconds`);
    if (seconds === 0) {
      clearInterval(interval);
      console.log(); // Move to the next line
      callback();
    }
  }, 1000);
  return interval;
}

function askQuestion(question, callback) {
  console.log(question.question);
  question.choices.forEach((choice, index) => {
    console.log(`${index + 1}. ${choice}`);
  });

  let userAnswer = null;
  let timerInterval = timer(10, () => {
    if (userAnswer === null) {
      console.log("\nSorry, you didn't answer in time.");
      callback(false); // Time's up
    }
  });

  prompt.question("Your answer (1-3): ", (answer) => {
    clearInterval(timerInterval);
    userAnswer = answer.trim();
    let chosenAnswer = question.choices[parseInt(userAnswer) - 1];
    if (chosenAnswer === question.correct) {
      score += question.level === "easy" ? 1 : question.level === "medium" ? 2 : 3 : 4;
      console.log("Correct!");
      callback(true);
    } else {
      console.log(`Sorry, the correct answer was: ${question.correct}`);
      callback(false);
    }
  });
}

function playQuiz() {
  score = 0;
  let shuffledQuestions = shuffleArray(questions);
  let index = 0;

  function nextQuestion() {
    if (index < shuffledQuestions.length) {
      askQuestion(shuffledQuestions[index], (correct) => {
        console.log(`Your current score is: ${score}`);
        index++;
        nextQuestion();
      });
    } else {
      scoreHistory.push(score);
      console.log(`Quiz finished! Your final score is: ${score}`);
      console.log(`Your score history: ${scoreHistory.join(', ')}`);

      prompt.question("Do you want to play again? (yes/no): ", (answer) => {
        if (answer.toLowerCase() === 'yes') {
          playQuiz();
        } else {
          console.log("Thanks for playing!");
          prompt.close();
        }
      });
    }
  }

  console.log("Welcome to the Quiz Game!");
  nextQuestion();
}

playQuiz();
