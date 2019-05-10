const input = document.getElementsByName("theme");
const elements = {
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
};

const defaultTheme = () => {
	colorCanvas = "#595959";
	colorGameOver = "#FF0000";
	colorFood = "#FF0000";
	colorSnake = "#00CA3F";

	elements.b.style.fontFamily = "Arial";
	elements.game.style.color = "#F7F2FF";
	elements.cover.style.backgroundColor = "#97D2F7";
	elements.game.style.backgroundColor = "#97D2F7";
	elements.hs_sec.style.backgroundColor = "#4CB5F5";
	elements.hs_sec.style.borderRadius = "15px";
	elements.hs_sec.style.border = "2px solid #486475";
	elements.theme_sec.style.backgroundColor = "#4CB5F5";
	elements.theme_sec.style.borderRadius = "15px";
	elements.theme_sec.style.border = "2px solid #486475"
	elements.title_sec.style.backgroundColor = "#4CB5F5";
	elements.title_sec.style.borderRadius = "15px";
	elements.title_sec.style.border = "2px solid #486475";
	elements.lb_sec.style.backgroundColor = "#4CB5F5";
	elements.lb_sec.style.borderRadius = "15px";
	elements.lb_sec.style.border = "2px solid #486475";
}

const darkTheme = () => {
	colorCanvas = "#17141F";
	colorGameOver = "#FF0000";
	colorFood = "#FF0000";
	colorSnake = "#00CA3F";

	elements.b.style.fontFamily = "Arial";
	elements.game.style.color = "#F7F2FF";
	elements.cover.style.backgroundColor = "#97D2F7";
	elements.game.style.backgroundColor = "#97D2F7";
	elements.hs_sec.style.backgroundColor = "#4CB5F5";
	elements.hs_sec.style.borderRadius = "15px";
	elements.hs_sec.style.border = "2px solid #486475";
	elements.theme_sec.style.backgroundColor = "#4CB5F5";
	elements.theme_sec.style.borderRadius = "15px";
	elements.theme_sec.style.border = "2px solid #486475"
	elements.title_sec.style.backgroundColor = "#4CB5F5";
	elements.title_sec.style.borderRadius = "15px";
	elements.title_sec.style.border = "2px solid #486475";
	elements.lb_sec.style.backgroundColor = "#4CB5F5";
	elements.lb_sec.style.borderRadius = "15px";
	elements.lb_sec.style.border = "2px solid #486475";
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