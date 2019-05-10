var FoodObject = function() {
	const cols = CANVAS.width/scale;
	const rows = CANVAS.height/scale;
	let randomx;
	let randomy;
	this.invalidSpot = false;
	this.present = false; // by default, there is no food

	this.createLocation = (axis) => {
		return Math.floor(Math.random() * axis);
	}

	this.checkSpawn = (fx, fy) => {
		foodPosX = fx * scale;
		foodPosY = fy * scale;
		for (i = 0; i < snake.tail.length; i++) {
			if (foodPosX == snake.tail[i].x && foodPosY == snake.tail[i].y) {
				return false;
			}
		}
		return true;
	}

	this.generate = () => {
		// Checks if the food has been eaten or generated yet
		do {
			if (this.present == false) {
				randomx = this.createLocation(cols);
				randomy = this.createLocation(rows);
				if (this.checkSpawn(randomx, randomy)) {
					this.x = randomx * scale;
					this.y = randomy * scale;
					this.present = true;
					this.invalidSpot = false;
				} else {
					this.invalidSpot = true;				}
			}
		} while(this.invalidSpot); // attempts a regenerate if spot is invalid
		ctx.fillStyle = colorFood;
		ctx.fillRect(this.x, this.y, scale, scale);
	}
}