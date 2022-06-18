
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {

	/* if (event.target == editAnswerModal) {
		editAnswerModal.style.display = "none";
	} */

}


function allowModalsEvents() {
	// Get the modal
	let editAnswerModal = document.getElementById("editAnswer");
	let editIcons = Array.from(document.getElementsByClassName('edit-icon'));
	let closeBtn = document.getElementById("closeEdit");

	editIcons.forEach(icon => {
		icon.addEventListener('click', () => {
			editAnswerModal.style.display = "block";
		})
	});

	closeBtn.addEventListener('click', () => {
		editAnswerModal.style.display = "none";
		updateAnswer();
		syncColors();
	});
}

export { allowModalsEvents }