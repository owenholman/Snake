var SnakeObject = function() {
	this.x = CANVAS.width / 2;
	this.y = CANVAS.height / 2;

	this.vx = 1;
	this.vy = 0;

	this.fullLength = 1;
	this.tail = [];

	this.validMove = (dir) => {
		switch(dir) {
			case 'ArrowLeft': case 'KeyA': // keycode for 'left'
				if (this.vx == 1 && this.vy == 0) { // direction for 'right', which should be invalid
					return false;
				}
			break;
			case 'ArrowUp': case 'KeyW': // keycode for 'up'
				if (this.vx == 0 && this.vy == 1) {
					return false;
				}
			break;
			case 'ArrowRight': case 'KeyD': // keycode for 'right'
				if (this.vx == -1 && this.vy == 0) {
					return false;
				}
			break;
			case 'ArrowDown': case 'KeyS': // keycode for 'down'
				if (this.vx == 0 && this.vy == -1) {
					return false;
				}
			break;
		}
		return true;
	}
	this.dead = () => {
		// checks if the snake hit the edge
		if (this.x < 0 || this.y < 0 || this.x > CANVAS.width || this.y > CANVAS.height) {
			return true;
		}
		// checks if the snake bit itself
		for (i = 0; i < this.tail.length; i++) {
			var tailPos = this.tail[i];
			if (this.x == tailPos.x && this.y == tailPos.y) { // Matching if the head positon ate any part of its tail
				return true;
			}
		}
		return false;
	}
	this.eatFood = (food) => {
		if (this.x == food.x && this.y == food.y) {
			return true;
		}
	}
	this.changedir = (xdir, ydir) => {
		this.vx = xdir;
		this.vy = ydir;
	}
	this.update = () => {
		this.tail.unshift({x: this.x, y: this.y});
		if (this.tail.length > this.fullLength) { // Checking if the snake grew
			this.tail.pop();
		}
		this.x = this.x + (this.vx * scale);
		this.y = this.y + (this.vy * scale);
		console.log(this.fullLength);
	}
	this.show = () => {
		ctx.fillStyle = '#00e676';
		this.tail.forEach(cell => {
			ctx.fillRect(cell.x, cell.y, scale, scale);
		})
	}
}