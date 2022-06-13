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

export { storeOption, addEventsToCards }