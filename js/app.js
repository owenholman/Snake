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

const finalScore = document.getElementById('final-score');
finalScore.style.display = 'none';
const gameBtn = document.getElementById('game-btn');
gameBtn.value = "Play";

const scale = 20;
let animate = true;
let flash = 0;
let gameCount = 0;

let snake;
let food;

// For fps control
const fps = 1000/10; // 1000ms divided by 10fps
let t1 = Date.now(); // First timestamp marked now
let t2;
let tchange;

const updateScore = () => {
	const scoreDiv = document.getElementById("score-num");
	scoreDiv.innerHTML = snake.fullLength;
}

const randomProvoke = () => {
	const provocations = [
		'Want another go?',
		'Try again',
		'Encore! Encore!',
		'Attempt a better score'
	];
	let chosenProvoke = Math.floor(Math.random() * provocations.length);
	return provocations[chosenProvoke];
}

const gameOver = () => {
	if (flash < 1) {
		ctx.fillStyle = colorGameOver;
		ctx.fillRect(0, 0, CANVAS.width, CANVAS.height);
		flash++;
	} else {
		flash = 2;
		animate = false;
		ctx.fillStyle = colorCanvas;
		ctx.fillRect(0, 0, CANVAS.width, CANVAS.height);
		finalScore.style.display = 'block';
		finalScore.innerHTML = ('Your final score was: ' + snake.fullLength);
		gameBtn.value = randomProvoke();
		document.getElementById('game-info').style.display = 'flex';
		document.getElementById('game-cover').style.display = 'flex';
	}
}

const play = () => {
	if (animate) {
		window.requestAnimationFrame(play); // Loops the function every time

		// Controlling the fps
		t2 = Date.now();
	    tchange = t2 - t1;
	    if (tchange > fps) {
	        t1 = t2 - (tchange % fps); // Reset
	        draw(); // Call draw method for every frame
	    }
	}
}

const draw = () => {
	// We redraw everything every frame

	// Draws/clears canvas
	ctx.fillStyle = colorCanvas;
	ctx.fillRect(0, 0, CANVAS.width, CANVAS.height);

	// checks if snake died
	if (snake.dead()) {
		console.log('Snake died.');
		gameOver();
	} else {
		// checks if snake ate food
		if (snake.eatFood(food)) {
			snake.fullLength += 4;
			food.present = false;
		}

		// Draws/updates snake
		snake.update();
		snake.show();

		// Generate the food after it is possibly eaten
		food.generate();

		// Updates scoreboard
		updateScore();
	}
}

window.addEventListener('keydown', e => {
	switch(e.code) {
		case 'ArrowLeft': case 'KeyA': // keycode for 'left'
			if (snake.validMove(e.code)) {
				snake.changedir(-1, 0);
			}
		break;

		case 'ArrowUp': case 'KeyW': // keycode for 'up'
			if (snake.validMove(e.code)) {
				snake.changedir(0, -1);
			}
		break;

		case 'ArrowRight': case 'KeyD': // keycode for 'right'
			if (snake.validMove(e.code)) {
				snake.changedir(1, 0);
			}
		break;

		case 'ArrowDown': case 'KeyS': // keycode for 'down'
			if (snake.validMove(e.code)) {
				snake.changedir(0, 1);
			}
		break;

		case 'Space': // keycode for 'spacebar'; plays/pauses the game
			if (snake.dead() == false) {
				if (animate) {
					animate = false;
				} else {
					animate = true;
					window.requestAnimationFrame(play);
				}
			}
		break;

		case 'Enter': // Clicks button to start game
			gameBtn.click();
		break;
	}
});

gameBtn.addEventListener('click', function() {
	document.getElementById("game-info").style.display = 'none';
	document.getElementById('game-cover').style.display = 'none';
	if (gameCount < 1) {
		snake = new SnakeObject();
		food = new FoodObject();
		gameCount++;
		window.requestAnimationFrame(play); // Calls play and sets off the start of the game
	} else {
		window.location.reload();
	}
});