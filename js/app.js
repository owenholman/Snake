// Canvas setup
const CANVAS = document.getElementById('game');
CANVAS.height = 600;
CANVAS.width = 600;
const ctx = CANVAS.getContext('2d');

// Colors to be changed by theme
var colorCanvas;
var colorGameOver;
var colorSnake;
var colorFood;

// grabbing html elements and setting them as constants
const currentScore = document.getElementById('currentscore-num');
const gameBtn = document.getElementById('game-btn');
const nameInput = document.getElementById('username');
var username; // Will be important later concerning the user's username
const finalScoreDiv = document.getElementById('game-f-score');
const finalScoreBtn = document.getElementById('game-f-ok');
const finalScoreName = document.getElementById('finalscore-name');
const finalScore = document.getElementById('finalscore-num');

// for the general iterators and constancy
const scale = 20; // the constant scale of every item that is drawn
var animating = false;
var flash = 0;

// to later be initialized to objects
var snake;
var food;

// initialize vectors
var dx;
var dy;

// For fps control
const fps = 1000/11; // 1000ms divided by fps
var t1 = Date.now(); // First timestamp marked now
var t2; // A second timestamp that has not been set yet
var tchange; // Delta(change) --> the difference between timestamps

// Arrow function updateScore()
const updateScore = () => { // Used to constantly update the snake's score dynamically
	currentScore.innerHTML = snake.tail.length; // setting the html element to the snake array's length
} // End of function updateScore()

// arrow function gameOver()
const gameOver = () => { // runs when the snake dies
	if (flash < 1) { // this clears the canvas with a red flash, signifying death. only runs once
		ctx.fillStyle = colorGameOver;
		ctx.fillRect(0, 0, CANVAS.width, CANVAS.height);
		flash++; // iterates
	} else { // runs after the flash has occured
		flash = 2; // making sure this variable is disposed (so that it doesn't flash again)
		animating = false; // Stops game

		// displaying final score to the user:
		finalScoreName.innerHTML = username;
		finalScore.innerHTML = snake.tail.length;
		finalScoreDiv.style.display = 'block';
		finalScoreBtn.style.display = 'block';
	}
}

// arrow function play()
const play = () => { // runs every single frame
	if (animating) { // checks for boolean animating
		window.requestAnimationFrame(play); // Loops the function every time it runs. An infinite loop as long as animating is true

		// Controlling the fps
		t2 = Date.now(); // Finally making the second timestamp
	    tchange = t2 - t1; // At the same time, seeing what the difference between the timestamps is
	    if (tchange > fps) { // If the difference of time is large enough, we run a frame. If it isn't, this function runs again and the time difference becomes bigger
	        t1 = t2 - (tchange % fps); // Reset timestamp 1
	        draw(); // Call draw method every time tchange is large enough
	    } // End of if statement for fps
	} // End of if statement for animating boolean
} // End of function play

// arrow function draw()
const draw = () => { // Runs 11 times per second, according to the fps control in the play() method
	// We redraw everything every frame for reliable updating

	// Draws/clears canvas
	ctx.fillStyle = colorCanvas;
	ctx.fillRect(0, 0, CANVAS.width, CANVAS.height);

	// checks if snake died (failsafe)
	if (snake.dead()) {
		gameOver();
	} else { // at this point the snake must be alive

		// checks if snake ate food
		if (snake.eatFood(food)) {
			snake.fullLength += 4;
			food.present = false;
		}

		// Draws/updates snake according to the user's input
		if (dx != null && dy != null) {
			snake.changedir(dx, dy);
		}

		// Updates and draws the snake onto the canvas
		snake.update();
		snake.show();

		// Generate the food after it is possibly eaten
		food.generate();

		// Updates scoreboard
		updateScore();
	}
}

// Adding an event listener for every time a user presses a key
window.addEventListener('keydown', e => {
	switch(e.code) { // we grab the event's code
		case 'ArrowLeft': case 'KeyA': // keycode for 'left'; multiple gameplaying options
			if (snake.validMove(e.code)) { // We check if the move is valid according to the snake's previous move
				dx = -1;
				dy = 0;
			} // end of validity if statement
		break;

		case 'ArrowUp': case 'KeyW': // keycode for 'up'; multiple gameplaying options
			if (snake.validMove(e.code)) { // We check if the move is valid according to the snake's previous move
				dx = 0;
				dy = -1;
			} // end of validity if statement
		break;

		case 'ArrowRight': case 'KeyD': // keycode for 'right'; multiple gameplaying options
			if (snake.validMove(e.code)) { // We check if the move is valid according to the snake's previous move
				dx = 1;
				dy = 0;
			} // end of validity if statement
		break;

		case 'ArrowDown': case 'KeyS': // keycode for 'down'; multiple gameplaying options
			if (snake.validMove(e.code)) { // We check if the move is valid according to the snake's previous move
				dx = 0;
				dy = 1;
			} // end of validity if statement
		break;

		case 'Space': // keycode for 'spacebar'; plays/pauses the game
			if (snake.dead() == false) { // the snake has to be alive in order to pause a game
				if (animating) { // reverses the state of the animation without disposing of the full function; this if statement pauses game
					animating = false;
				} else { // checks if the game is paused, and plays it
					animating = true;
					window.requestAnimationFrame(play); // calls upon the 
				} // End of if statement
			} // End of outer if statement
		break;

		case 'Enter': // Clicks button to start game; small keyboard shortcut functionality
			if (!animating) { // the game must not be running in order to press these buttons, or else the game will restart while the user is playing
				finalScoreBtn.click();
				gameBtn.click();
			} // End of if statement
		break;
	} // End of switch conditional
}); // End of Event listener

// Adds an event listener to when the html button is clicked
gameBtn.addEventListener('click', function() { // Begin of event listener function
	if (nameInput.value == "") { // Checks that the user must have inputted a valid name
		alert('Please input a name!'); // User notification
	} else { // Runs as long as the user has a valid name
		username = nameInput.value; // Sets the user's name to a variable
		if (!animating && flash < 1) { // If statement that runs to begin the game
			document.getElementById("cover-content").style.display = 'none'; // Removing the cover/lobby screen
			document.getElementById("game-c-score").style.display = 'block'; // Adding the score element
			// Initializing our objects from the other JavaScript files
			snake = new SnakeObject();
			food = new FoodObject();
			animating = true; // Sets this boolean to true
			window.requestAnimationFrame(play); // Calls play and sets off the start of the game
		} // End of running if statement
	} // End of outer else statement
}); // End of event listener function

// Adds an event listener to the button that displays once the snake is dead
finalScoreBtn.addEventListener('click', function() { // Begin of event listener function
	if (flash > 1) { // Checks that the flash has already occured
		window.location.reload(); // Reloads the page
	} // End of if statement
}); // End of event listener function