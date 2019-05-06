var FoodObject = function() {
	const cols = CANVAS.width/scale;
	const rows = CANVAS.height/scale;
	let randomx;
	let randomy;
	this.present = false; // by default, there is no food

	this.generate = () => {
		// Checks if the food has been eaten or generated yet
		if (this.present == false) {
			randomx = Math.floor(Math.random() * cols);
			randomy = Math.floor(Math.random() * rows);
			this.x = randomx * scale;
			this.y = randomy * scale;
			this.present = true;
		}
		ctx.fillStyle = '#e91e63';
		ctx.fillRect(this.x, this.y, scale, scale);
	}
}