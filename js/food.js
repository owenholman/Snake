// FoodObject object
var FoodObject = function() { // Begin of object function foodObject
	// constant declarations for the canvas
	const cols = CANVAS.width/scale;
	const rows = CANVAS.height/scale;

	// Local variables let for better storing
	let randomx;
	let randomy;

	// this. attribute variables
	this.invalidSpot = false; // By default the food generation spot is valid
	this.present = false; // by default, there is no food

	// begin this.createLocation() function
	this.createLocation = (axis) => { // this comes up with a random column or row for the food to generate
		return Math.floor(Math.random() * axis);
	} // End of function createLocation()

	// begin this.checkSpawn() function
	this.checkSpawn = (fx, fy) => { // takes the suggested food generation spot and checks if it might generate on the snake
		// local variables for this scope that come up with the actual coordinates of the potential food generation spot
		let foodPosX = fx * scale;
		let foodPosY = fy * scale;
		for (i = 0; i < snake.tail.length; i++) { // begin for loop iterating through the snake's length
			if (foodPosX == snake.tail[i].x && foodPosY == snake.tail[i].y) { // begin of if statement that checks if the food's proposed spot does not equal any of the snake's cells
				return false; // If it matches any cell of the snake, we exit out of the function
			} // End of if statement
		} // End of for loop
		return true; // Runs if the food's generation status is perfectly valid
	} // End of function checkspawn()

	// begin this.generate() function
	this.generate = () => { // this function is run every single frame in app.js
		// Checks if the food has been eaten or generated yet
		do { // begin do while loop; food must be attempted to be generated at least once
			if (this.present == false) { // checks if the food does not exist in the game yet
				// comes up with proposed location
				randomx = this.createLocation(cols);
				randomy = this.createLocation(rows);
				if (this.checkSpawn(randomx, randomy)) { // calls checkspawn() function above to make sure the location is valid
					// sets the variables to the proposed spots
					this.x = randomx * scale;
					this.y = randomy * scale;
					this.present = true; // sets the boolean and tells the function when it is later called that food is already present
					this.invalidSpot = false; // Resetting boolean
				} else { // runs if the food generated on the snake's tail
					this.invalidSpot = true; // boolean set to true so that another proposed location can be generated
				} // end of if/else statement
			}
		} while(this.invalidSpot); // attempts a regenerate if spot is invalid
		// draws the valid food spot constantly, dependent of whether the food has been re-generated or not
		ctx.fillStyle = colorFood;
		ctx.fillRect(this.x, this.y, scale, scale);
	} // end of generate() function
} // End of FoodObject