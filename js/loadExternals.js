/**
 * 
 * @param {string} id element where to load html
 * @param {string} filename file to load
 * @returns void
 */
function loadHTML(id, filename) {
	return new Promise(resolve => {
		let xhttp;
		let element = document.getElementById(id);
		let file = filename;

		xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				element.innerHTML = this.responseText;
				resolve();
			}
		};

		xhttp.open("GET", `../../${file}`, true);
		xhttp.send();
	})
}

//Load CSS
function loadCSS(url) {
	let head = document.getElementsByTagName("HEAD")[0];
	let link = document.createElement("link");
	link.rel = "stylesheet";
	link.type = "text/css";
	link.href = `../../${url}`;
	head.appendChild(link);
}

//Load JS
function loadJS(url) {
	let myScript = document.createElement("script");
	myScript.setAttribute("src", `../../${url}`);
	document.body.appendChild(myScript);
}

export {
	loadHTML
};