// Creating a score object
const score = {
    wins: 0,
    losses: 0,
    ties: 0
};

// Preparing display settings
// Locating and linking the paragraph elements
let theResultDisplay = document.querySelector(".jsResult");
let theMovesDisplay = document.querySelector(".jsMoves");
let theScoreDisplay = document.querySelector(".jsScore");

// Listening to the "storage" event of the localStorage object
window.addEventListener("storage", fetchExistingScore(), true);

// Function 1: Starting the game and generating the computer move
function generateComputerMove(userMove) {

    // Using the random() method from the Math object to generate a random value
    // between 0 and 1
    const randomNumber = Math.random();

    // Storing the computer move in a variable
    let computerMove = '';

    // Checking the random value based on the assumption of dividing the 0 to 1 range
    // into thirds
    if (randomNumber >= 0 && randomNumber < 1 / 3) {
        computerMove = "Rock";
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computerMove = "Paper";
    } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
        computerMove = "Scissors";
    }

    // Printing the moves to the console
    console.log(`Computer: ${computerMove} - User: ${userMove}`);

    // Sending the moves to the compareChoices function
    compareChoices(userMove, computerMove);
}

// Function 2: Comparing the choices
function compareChoices(userChoice, computerChoice) {

    // Creating the result variable
    let theResult = '';

    // Comparing the user and computer choices
    if (userChoice === computerChoice) {
        theResult = "Tie."
    } else if (userChoice === "Rock" && computerChoice === "Paper") {
        theResult = "You lose.";
    } else if (userChoice === "Rock" && computerChoice === "Scissors") {
        theResult = "You win.";
    } else if (userChoice === "Paper" && computerChoice === "Rock") {
        theResult = "You win.";
    } else if (userChoice === "Paper" && computerChoice === "Scissors") {
        theResult = "You lose.";
    } else if (userChoice === "Scissors" && computerChoice === "Paper") {
        theResult = "You win.";
    } else if (userChoice === "Scissors" && computerChoice === "Rock") {
        theResult = "You lose.";
    }

    // Calling the updateScore function
    let currentScore = updateScore(theResult);

    // Saving the current score into the localStorage object
    // LocalStorage works with text data [Use JSON.stringfy() to convert the score object into text]
    localStorage.setItem('score', JSON.stringify(score));

    // Displaying the comparison result
    displayResults(theResult, userChoice, computerChoice, currentScore);
}

// Function 3: Updating the score
function updateScore(aResult) {

    // Checking the result
    if (aResult === "Tie.") {
        score.ties += 1;
    } else if (aResult === "You win.") {
        score.wins += 1;
    } else if (aResult === "You lose.") {
        score.losses += 1;
    }

    // Storing the updated score
    let theScore = `Wins: ${score.wins} - Losses: ${score.losses} - Ties: ${score.ties}`;
    // Returning the updated score
    return theScore;
}

// Function 4: Resetting the game score
function resetScore() {

    score.wins = 0;
    score.losses = 0;
    score.ties = 0;

    // Deleting saved score from the localStorage
    localStorage.removeItem('score');

    // Storing the updated scores status
    let theScore = `Wins: ${score.wins} - Losses: ${score.losses} - Ties: ${score.ties}`;
    // Calling the displayResults function
    displayResults(undefined, undefined, undefined, theScore);
}

// Function 5: Fetching the score from localStorage [if it exists]
function fetchExistingScore() {

    // Getting the score from the localStorage and converting it back to javaScript object
    let newScore = JSON.parse(localStorage.getItem('score'));

    // Checking if the newScore is not empty
    if (newScore === null) {
        alert("There is no saved score.");
    } else {
        alert("Saved score available.");
        // Updating the score object
        score.wins = newScore.wins;
        score.losses = newScore.losses;
        score.ties = newScore.ties;
    }
}

// Function 6: Displaying the game status
function displayResults(aResult = "New Game", userVal = "No Moves", computerVal = "No Moves", scoreVal) {
    theResultDisplay.innerHTML = aResult;
    theMovesDisplay.innerHTML = `You
<img src="./images/${userVal}Final.png" class="moveIcon">
<img src="./images/${computerVal}Final.png" class="moveIcon">
Computer`;
    theScoreDisplay.innerHTML = scoreVal;
}