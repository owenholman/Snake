// The purpose of this file is to change the colors of the game based on the user's dynamic input

const input = document.getElementsByName("theme"); // grabbing the field on the UI
const elements = { // We create an object with all the different selectors we could possibly adjust
	b: document.getElementsByTagName("body")[0],
	cover: document.getElementById("cover-content"),
	game: document.getElementById("game-content"),
	l_col: document.getElementById("left-col"),
	m_col: document.getElementById("middle-col"),
	r_col: document.getElementById("right-col"),
	underln: document.getElementsByClassName("underline"),
	hs_sec: document.getElementById("hs-sec"),
	theme_sec: document.getElementById("theme-sec"),
	title_sec: document.getElementById("title-sec"),
	lb_sec: document.getElementById("lb-sec"),
	hs_num: document.getElementById("game-f-score"),
	cs_num: document.getElementById("game-c-score"),
	g_info: document.getElementById("game-info"),
	g_score: document.getElementById("game-c-score"),
	user_field: document.getElementById("username")
}; // end of elements object

const defaultTheme = () => { // begin default theme function
	// changing the colors of the html elements
	colorCanvas = "#252526";
	colorGameOver = "#FF0000";
	colorFood = "#FF0000";
	colorSnake = "#00CA3F";
	// defined within the elements object
	elements.game.style.color = "#F7F2FF";
	elements.game.style.backgroundColor = "#F2F2F2";
	for (i = 0; i < elements.underln.length; i++) { // begin for loop; making a bottom border to everything with the underln class
		elements.underln[i].style.borderBottom = "3px solid #0D0D0D";
	} // end of for loop
	elements.cover.style.backgroundColor = "#F2F2F2";
	elements.cover.style.color = "#252526";
	gameBtn.style.backgroundColor = "#0D0D0D";
	gameBtn.style.color = "#F2F2F2";
	elements.user_field.style.backgroundColor = "#00CA3F";
} // end of default theme function

const darkTheme = () => { // begin dark theme function
	// changing the colors of the html elements
	colorCanvas = "#262626";
	colorGameOver = "#FF0000";
	colorFood = "#FF0000";
	colorSnake = "#00CA3F";
	// defined within the elements object
	elements.game.style.color = "#D9D9D9";
	elements.game.style.backgroundColor = "#0D0D0D";
	for (i = 0; i < elements.underln.length; i++) { // begin for loop; making a bottom border to everything with the underln class
		elements.underln[i].style.borderBottom = "1px solid #D9D9D9";
	} // end of for loop
	elements.cover.style.backgroundColor = "#0D0D0D";
	elements.cover.style.color = "#D9D9D9";
	gameBtn.style.backgroundColor = "#D9D9D9";
	gameBtn.style.color = "#262626";
	elements.user_field.style.backgroundColor = "#00CA3F";
} // end of dark theme function

const scifiTheme = () => { // begin scifiTheme function
	// changing the colors of the html elements
	colorCanvas = "#011126";
	colorGameOver = "#FF0000";
	colorFood = "#FF0058";
	colorSnake = "#19FFFF";
	// defined within the elements object
	elements.game.style.color = "#F7F2FF";
	elements.game.style.backgroundColor = "#CCD6D9";
	for (i = 0; i < elements.underln.length; i++) { // begin for loop; making a bottom border to everything with the underln class
		elements.underln[i].style.borderBottom = "1px solid #FF0058";
	} // end of for loop
	elements.cover.style.backgroundColor = "#011126";
	elements.cover.style.color = "#19FFFF";
	gameBtn.style.backgroundColor = "#19FFFF";
	gameBtn.style.color = "#011126";
	elements.user_field.style.backgroundColor = "#FF0058";
} // end of scifitheme function

const applyTheme = (theme) => { // apply theme function
	switch(theme) { // begin switch statement for function parameter theme
		case 'default': // if the theme is a string 'default'
			defaultTheme(); // runs the aforedeclared defaulttheme function
		break;
		case 'dark': // if the theme is a string 'dark'
			darkTheme(); // runs the aforedeclared darktheme function
		break;
		case 'scifi': // if the theme is a string 'scifi'
			scifiTheme(); // runs the aforedeclared scifitheme function
		break;
	} // end switch statement
} // end of function applyTheme()

var selection = 'default'; // declaring the selection to be default on pageload (by default)
applyTheme(selection);

for (i = 0; i < input.length; i++) { // start of for loop; for changing the theme
	input[i].addEventListener('change', function() { // adding event listener for each radio button in index.html
		selection = this.id; // the selection is the respective id of whichever event is clicked
		applyTheme(selection); // runs function applyTheme with the changed selecion
	}); // end of event listener
} // end of for loop