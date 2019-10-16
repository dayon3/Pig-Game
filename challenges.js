/*
CODING CHALLENGE
Change the game to follow these rules: 

1. A player looses his ENTIRE  score when he rolls two 6 in a row. After that, it's the next player's
turn. (HINT: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the
predefined score of 100. (HINT: You can read that value with the .value property in JavaScript. This is a
good opportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score
when one of them is a 1. (HINT: you will need CSS to position the second dice, so take a look at the CSS
code for the first one.)
*/

var scores, roundScore, activePlayer, gamePlaying;

init();

var previousDiceRoll;

// event handler
document.querySelector(".btn-roll").addEventListener("click", function() {
	if (gamePlaying) {
		// 1. Generate random number
		var dice0 = Math.floor(Math.random() * 6) + 1;
		var dice1 = Math.floor(Math.random() * 6) + 1;

		// 2. Display the result
		document.getElementById("dice-0").style.display = "block";
		document.getElementById("dice-1").style.display = "block";
		document.getElementById("dice-0").src = "dice-" + dice0 + ".png";
		document.getElementById("dice-1").src = "dice-" + dice1 + ".png";

		// 3. Update the roundScore but only IF the round number was NOT a 1
		if (dice0 !== 1 && dice1 !== 1) {
			// Add score
			roundScore += dice0 + dice1;
			document.querySelector(
				"#current-" + activePlayer
			).textContent = roundScore;
		} else {
			// Next player
			nextPlayer();
		}
		/*
		if (dice === 6 && previousDiceRoll === 6) {
			// player looses entire score
			scores[activePlayer] = 0;
			document.querySelector("#score-" + activePlayer).textContent =
				scores[activePlayer];
			nextPlayer();
		} else if (dice !== 1) {
			// Add score
			roundScore += dice;
			document.querySelector(
				"#current-" + activePlayer
			).textContent = roundScore;
		} else {
			// Next player
			nextPlayer();
		}
		previousDiceRoll = dice;
		*/
	}
});

document.querySelector(".btn-hold").addEventListener("click", function() {
	if (gamePlaying) {
		// Add CURRENT score to GLOBAL score
		scores[activePlayer] += roundScore;

		// Update the UI
		document.querySelector("#score-" + activePlayer).textContent =
			scores[activePlayer];

		// var input = document.getElementById("globalScore").value;

		var input = document.querySelector(".final-score").value;
		var winningScore;

		// Check if the input field has a value
		// Undefined, 0, null or "" (empy string) are COERCED to false
		// Anything else is COERCED to true
		if (input) {
			winningScore = input;
		} else {
			winningScore = 100;
		}

		// Check if player won the game
		if (scores[activePlayer] >= winningScore) {
			// Player Wins
			document.querySelector("#name-" + activePlayer).textContent =
				"Winner!";
			hideDice();
			document
				.querySelector(".player-" + activePlayer + "-panel")
				.classList.add("winner");
			document
				.querySelector(".player-" + activePlayer + "-panel")
				.classList.remove("active");

			gamePlaying = false;
		} else {
			// Next player
			nextPlayer();
		}
	}
});

function nextPlayer() {
	// Next Player
	activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
	roundScore = 0;

	document.getElementById("current-0").textContent = "0";
	document.getElementById("current-1").textContent = "0";

	document.querySelector(".player-0-panel").classList.toggle("active");
	document.querySelector(".player-1-panel").classList.toggle("active");

	//document.querySelector('.player-0-panel').classList.remove('active');
	//document.querySelector('.player-1-panel').classList.add('active');

	hideDice();
}

document.querySelector(".btn-new").addEventListener("click", init);

function hideDice() {
	document.getElementById("dice-0").style.display = "none";
	document.getElementById("dice-1").style.display = "none";
}

function init() {
	scores = [0, 0];
	roundScore = 0;
	activePlayer = 0;
	gamePlaying = true;

	// change CSS of an element
	hideDice();

	// get element by ID
	var playerOnePanelDOM = document.querySelector(".player-0-panel");
	var playerTwoPanelDOM = document.querySelector(".player-1-panel");
	document.getElementById("score-0").textContent = "0";
	document.getElementById("score-1").textContent = "0";
	document.getElementById("current-0").textContent = "0";
	document.getElementById("current-1").textContent = "0";
	document.getElementById("name-0").textContent = "Player 1";
	document.getElementById("name-1").textContent = "Player 2";
	playerOnePanelDOM.classList.remove("winner");
	playerTwoPanelDOM.classList.remove("winner");
	playerOnePanelDOM.classList.remove("active");
	playerTwoPanelDOM.classList.remove("active");

	playerOnePanelDOM.classList.add("active");
}
