function storeOption() {
	let option = document.querySelector('.active-card .option-card-title').innerText
	localStorage.setItem('evalType', option)
}

function addEventsToCards() {
	document.querySelectorAll('.option-card').forEach(card => {
		
		card.addEventListener('click', event => {

			document.querySelectorAll('.active-card').forEach( card => {
				card.classList.remove('active-card')  
			  });

			let currentCard = event.currentTarget;
			currentCard.classList.toggle('active-card');
		})
	})
}

function allowGraphicalSelector() {
	let selectors = Array.from(document.getElementsByClassName('graphical-banner'));

	selectors.forEach( selector => {
		selector.addEventListener('click', event => {
			let graphical = event.currentTarget;
			let input = graphical.parentElement.querySelector('input')

			input.checked = true;
		})
	})
}

function allowOptionBtns() {
	let optionBtns = Array.from(document.getElementsByClassName('option-btn'));

	optionBtns.forEach(btn => {
		btn.addEventListener('click', event => {
			let container = event.currentTarget.offsetParent;
			let option = event.currentTarget;
			let isChild = container.contains(option);

			if (isChild) {
				container.querySelectorAll('.active').forEach(opt => opt.classList.remove('active'))
				option.classList.toggle('active')
			}
		})
	})
}

export { storeOption, addEventsToCards, allowGraphicalSelector, allowOptionBtns }