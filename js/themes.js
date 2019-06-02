const input = document.getElementsByName("theme");
const elements = {
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
};

const defaultTheme = () => {
	colorCanvas = "#252526";
	colorGameOver = "#FF0000";
	colorFood = "#FF0000";
	colorSnake = "#00CA3F";
	elements.game.style.color = "#F7F2FF";
	elements.game.style.backgroundColor = "#F2F2F2";
	for (i = 0; i < elements.underln.length; i++) {
		elements.underln[i].style.borderBottom = "3px solid #0D0D0D";
	}
	elements.cover.style.backgroundColor = "#F2F2F2";
	elements.cover.style.color = "#252526";
	gameBtn.style.backgroundColor = "#0D0D0D";
	gameBtn.style.color = "#F2F2F2";
	elements.user_field.style.backgroundColor = "#00CA3F";
}

const darkTheme = () => {
	colorCanvas = "#262626";
	colorGameOver = "#FF0000";
	colorFood = "#FF0000";
	colorSnake = "#00CA3F";
	elements.game.style.color = "#D9D9D9";
	elements.game.style.backgroundColor = "#0D0D0D";
	for (i = 0; i < elements.underln.length; i++) {
		elements.underln[i].style.borderBottom = "1px solid #D9D9D9";
	}
	elements.cover.style.backgroundColor = "#0D0D0D";
	elements.cover.style.color = "#D9D9D9";
	gameBtn.style.backgroundColor = "#D9D9D9";
	gameBtn.style.color = "#262626";
	elements.user_field.style.backgroundColor = "#00CA3F";
}

const scifiTheme = () => {
	colorCanvas = "#011126";
	colorGameOver = "#FF0000";
	colorFood = "#FF0000";
	colorSnake = "#00CA3F";
	elements.game.style.color = "#F7F2FF";
	elements.game.style.backgroundColor = "#CCD6D9";
	for (i = 0; i < elements.underln.length; i++) {
		elements.underln[i].style.borderBottom = "1px solid #FF0058";
	}
	elements.cover.style.backgroundColor = "#011126";
	elements.cover.style.color = "#19FFFF";
	gameBtn.style.backgroundColor = "#19FFFF";
	gameBtn.style.color = "#011126";
	elements.user_field.style.backgroundColor = "#FF0058";
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