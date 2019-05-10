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

const currentScore = document.getElementById('currentscore-num');
const gameBtn = document.getElementById('game-btn');
gameBtn.value = "Play";

const finalScoreDiv = document.getElementById('game-f-score');
const finalScore = document.getElementById('finalscore-num');
const finalScoreBtn = document.getElementById('game-f-ok');

const scale = 20;
var animating = false;
var flash = 0;

var snake;
var food;

var dx;
var dy;

// For fps control
const fps = 1000/11; // 1000ms divided by fps
let t1 = Date.now(); // First timestamp marked now
let t2;
let tchange;

const updateScore = () => {
	currentScore.innerHTML = snake.tail.length;
	finalScore.innerHTML = snake.tail.length;
}

const gameOver = () => {
	if (flash < 1) {
		ctx.fillStyle = colorGameOver;
		ctx.fillRect(0, 0, CANVAS.width, CANVAS.height);
		flash++;
	} else {
		flash = 2;
		animating = false;
		finalScoreDiv.style.display = 'block';
		finalScoreBtn.style.display = 'block';
	}
}

const play = () => {
	if (animating) {
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
		if (dx != null && dy != null) {
			snake.changedir(dx, dy);
		}
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
				dx = -1;
				dy = 0;
			}
		break;

		case 'ArrowUp': case 'KeyW': // keycode for 'up'
			if (snake.validMove(e.code)) {
				dx = 0;
				dy = -1;
			}
		break;

		case 'ArrowRight': case 'KeyD': // keycode for 'right'
			if (snake.validMove(e.code)) {
				dx = 1;
				dy = 0;
			}
		break;

		case 'ArrowDown': case 'KeyS': // keycode for 'down'
			if (snake.validMove(e.code)) {
				dx = 0;
				dy = 1;
			}
		break;

		case 'Space': // keycode for 'spacebar'; plays/pauses the game
			if (snake.dead() == false) {
				if (animating) {
					animating = false;
				} else {
					animating = true;
					window.requestAnimationFrame(play);
				}
			}
		break;

		case 'Enter': // Clicks button to start game
			finalScoreBtn.click();
			gameBtn.click();
		break;
	}
});

gameBtn.addEventListener('click', function() {
	if (animating) {
	} else if (!animating && flash < 1){
		document.getElementById("cover-content").style.display = 'none';
		document.getElementById("game-c-score").style.display = 'block';
		snake = new SnakeObject();
		food = new FoodObject();
		animating = true;
		window.requestAnimationFrame(play); // Calls play and sets off the start of the game
	}
});

finalScoreBtn.addEventListener('click', function() {
	if (flash > 1) {
		window.location.reload();
	}
});