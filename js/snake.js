// SnakeObject object function
var SnakeObject = function() { // begin function snakeObject
	// Begin this. declarations
	this.x = CANVAS.width / 2;
	this.y = CANVAS.height / 2;
	this.dx = 1; // x velocity
	this.dy = 0; // y velocity
	this.fullLength = 1;
	this.tail = []; // cells array

	// this.validMove() function
	this.validMove = (dir) => { // checks if the move that the user proposed is in the opposite direction, which shiuld be invalid
		switch(dir) { // begin of switch consitional
			case 'ArrowLeft': case 'KeyA': // keycode for 'left'
				if (this.dx == 1 && this.dy == 0) { // direction for 'right', which should be invalid
					return false;
				}
			break;
			case 'ArrowUp': case 'KeyW': // keycode for 'up'
				if (this.dx == 0 && this.dy == 1) { // direction for 'down', which should be invalid
					return false;
				}
			break;
			case 'ArrowRight': case 'KeyD': // keycode for 'right'
				if (this.dx == -1 && this.dy == 0) { // direction for 'left', which should be invalid
					return false;
				}
			break;
			case 'ArrowDown': case 'KeyS': // keycode for 'down'
				if (this.dx == 0 && this.dy == -1) { // direction for 'up', which should be invalid
					return false;
				}
			break;
		} // end of switch statement for valid move
		return true; // returns true if move is valid
	} // end of validmove function

	// begin this.dead() function
	this.dead = () => { // this function tests for the snake's death
		// if statement checks if the snake hit the edge
		if (this.x < 0 || this.y < 0 || this.x >= CANVAS.width || this.y >= CANVAS.height) { // matching x and y coordinates
			return true;
		} // end of if statement

		// checks if the snake bit itself
		for (i = 0; i < this.tail.length; i++) { // begin for loop; looping through the snake's cells
			let tailPos = this.tail[i]; // small abbreviation
			if (this.x == tailPos.x && this.y == tailPos.y) { // Matching if the head positon ate any part of its tail
				return true;
			} // end of if statement
		} // end of for loop
		return false; // the snake is not dead if it gets this far into the function without returning true
	} // end of function this.dead

	// begin this.eatFood() function
	this.eatFood = (food) => { // takes food as parameter; testing if the snake ate the food
		if (this.x == food.x && this.y == food.y) { // begin if statement; checks if the snake's head is equal to the food
			return true;
		} // end of if statement
	} // end of function this.eatfood

	// begin this.changedir function
	this.changedir = (xdir, ydir) => { // this function is called in app.js, where the snake's velocity (which is a vector/directional) is changed
		this.dx = xdir;
		this.dy = ydir;
	} // end this.changedir

	// begin this.update function
	this.update = () => { // for the snake's moving mechanics
		this.tail.unshift({x: this.x, y: this.y}); // every time the snake moves a cell, we must unshift the whole array of cells down
		if (this.tail.length > this.fullLength) { // because we are unshifting, we need to make sure the cell on the end pops once/movement
			this.tail.pop();
		} // end of if statement

		// increases the snake's x value by its velocity. this is what makes the snake move
		this.x = this.x + (this.dx * scale);
		this.y = this.y + (this.dy * scale);
	} // end of function this.update

	// begin function this.show
	this.show = () => { // the purpose of this function is the last step: actually rendering the snake object on the canvas
		ctx.fillStyle = colorSnake; // grabbing the color of the snake
		this.tail.forEach(cell => { // begin forEach advanced for loop
			ctx.fillRect(cell.x, cell.y, scale, scale); // filling each array (the cells) with the snake's shade
		}); // end of forEach loop
	} // end of this.show
} // end of snakeObject