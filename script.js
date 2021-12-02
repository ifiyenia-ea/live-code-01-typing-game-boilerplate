// Variables for the DOM elements
const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const settingsBtn = document.getElementById("settings-btn");
const difficultySelect = document.getElementById("difficulty");

// Array
const words = [
  "dependent",
  "dog",
  "superficial",
  "admit",
  "juice",
  "javascript",
  "developer",
  "airplane",
  "great",
  "fun",
  "manipulate",
  "cat",
  "transition",
  "school",
  "computer",
  "programming",
  "drag",
  "loving",
  "north",
];

// we need to:
// get a random word from the words array
// add the word to the DOM
// an event listener for the text element
// check if its the correct input
// update score
// a timer that is counting down time
// update the timer
// handle if its game over
// control/change difficulty
// create function for eacth difficulty
// set time depending on difficulty

// INITIALISE WORD
let randomWord;

// INITIALISE SCORE
let score = 0;

// INITIALISE TIME
let time = 10;

let difficulty = localStorage.getItem("difficulty") !== null
 ? localStorage.getItem("difficulty") : "easy";

difficultySelect.value = localStorage.getItem("difficulty") !== null
 ? localStorage.getItem("difficulty") : "easy";

text.focus();
// choose (choosing?) element that should be focused at start

const timeInterval = setInterval(updateTime, 1000);


// get random word from our array
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
  // "floor will just round down"
}

// console.log(getRandomWord());
// checking if the function is working

// add the word to the DOM
function addWordToDOM() {
  randomWord = getRandomWord();
  //assign whatever random word the getRandomWord function will return
  // to the variable randomWord
  word.innerHTML = randomWord;
  // (word - top of document, getElementById from html id)
  // using the word DOM element
  // now the word html will become the random word
}

// function to update score:
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

//function to update time:
function updateTime() {
  // checking console.log(1);
  time--;
  timeEl.innerHTML = time + "s";

  // to clear the interval so the timer stops (and not keeps counting 
  // down on minus)
  if (time === 0) {
    clearInterval(timeInterval);
    gameOver();
  }
}

// the game over
function gameOver() {
  endgameEl.innerHTML = `<h1>Time ran out!</h1> <p>Your final score is ${score} </p> <button onclick="location.reload()"> Reload </button>`

  endgameEl.style.display = "flex";
}

addWordToDOM();

// event listener (to text input field, id "text")
text.addEventListener("input", (event) => {
  const insertedText = event.target.value;
 // console.log(insertedText);
  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();
        
    //to clear input field:
    event.target.value ="";

    if(difficulty === "hard") {
      time += 2;
    } else if (difficulty === "medium") {
      time += 3;
    } else {
      time += 5;
    }

    updateTime();
  }
})

settingsBtn.addEventListener("click", () => settings.classList.toggle("hide"))

settingsForm.addEventListener("change", (event) => {
  difficulty = event.target.value;

  localStorage.setItem("difficulty", difficulty);
})