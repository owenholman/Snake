const input = document.getElementsByName("theme");
const selectArray = [{
	b: document.getElementsByTagName("body")[0],
	cover: document.getElementById("cover-content"),
	game: document.getElementById("game-content"),
	l_col: document.getElementById("left-col"),
	m_col: document.getElementById("middle-col"),
	r_col: document.getElementById("right-col"),
	hs_sec: document.getElementById("hs-sec"),
	theme_sec: document.getElementById("theme-sec"),
	title_sec: document.getElementById("title-sec"),
	lb_sec: document.getElementById("lb-sec"),
	hs_num: document.getElementById("game-f-score"),
	cs_num: document.getElementById("game-c-score"),
	g_info: document.getElementById("game-info")
}];

const defaultTheme = () => {
	colorCanvas = "#595959";
	colorGameOver = "#FF0000";
	colorFood = "#FF0000";
	colorSnake = "#00CA3F";

	let elements = selectArray[0];
	elements.b.style.fontFamily = "Arial";
	elements.b.style.backgroundColor = "#91FD57";
	elements.title_sec.style.borderRadius = "25px";
	elements.title_sec.style.border = "5px solid #03BF00";
	elements.game.style.color = "#F7F2FF";
}

const dark = () => {
	colorCanvas = "";
	colorGameOver = "";
	colorFood = "";
	colorSnake = "";


}

const applyTheme = (theme) => {
	switch(theme) {
		case 'default':
			defaultTheme();
		break;
		case 'dark':
			darkTheme();
		break;
		case 'scifi':
			scifiTheme();
		break;
	}
}

var selection = 'default';
applyTheme(selection);

for (i = 0; i < input.length; i++) {
	input[i].addEventListener('change', function() {
		selection = this.id;
		applyTheme(selection);
	});
}