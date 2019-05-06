// Canvas setup
const CANVAS = document.getElementById('game');
CANVAS.width=600;
CANVAS.height=600;
const ctx = CANVAS.getContext('2d');
const scale = 20;

let animate = true;

// New instance of snake object from snake.js
const snake = new SnakeObject();
const food = new FoodObject();

// For fps control
const fps = 1000/10; // 1000ms divided by 10fps
let t1 = Date.now(); // First timestamp marked now
let t2;
let tchange;

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
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, CANVAS.width, CANVAS.height);

	// checks if snake died
	if (snake.dead()) {
		console.log('The snake died!');
		animate = false;
	}

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
			if (animate) {
				animate = false;
			} else {
				animate = true;
				window.requestAnimationFrame(play);
			}
		break;
	}
});

window.requestAnimationFrame(play); // Calls play and sets off the start of the game