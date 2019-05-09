const input = document.getElementsByName("theme");
const selectArray = [{
	b: document.getElementsByTagName("body")[0],
	l_col: document.getElementById("left-col"),
	r_col: document.getElementById("right-col"),
	sec: document.getElementsByClassName("section"),
	s_sec: document.getElementById("score-section"),
	t_sec: document.getElementById("theme-section"),
	l_sec: document.getElementById("leaderboards-section"),
	info: document.getElementById("game-info"),
	i_f_score: document.getElementById("final-score"),
	i_g_btn: document.getElementById("game-btn"),
	g_cover: document.getElementById("game-cover")}
];

const defaultTheme = () => {
	colorCanvas = "#595959";
	colorGameOver = "#FF0000";
	colorFood = "#FF0000";
	colorSnake = "#00CA3F";

	let elements = selectArray[0];
	elements.b.style.fontFamily = "Arial, sans-serif";
	elements.l_col.style.backgroundColor = "#D9D9D9";
	elements.r_col.style.backgroundColor = "#D9D9D9";
	for (i = 0; i < elements.sec.length; i++) {
		elements.sec[i].style.backgroundColor = "#F2F2F2";
	}
	elements.info.style.color = "#F2F2F2";
	elements.g_cover.style.backgroundColor = "#595959";
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