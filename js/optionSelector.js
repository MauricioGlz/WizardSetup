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

/**
 * It allows tot he user to change the graphic style used on the answers  
 */
function allowGraphicalSelector() {
	let selectors = Array.from(document.getElementsByClassName('graphical-banner'));

	selectors.forEach( selector => {
		selector.addEventListener('click', event => {
			let graphical = event.currentTarget;
			let input = graphical.parentElement.querySelector('input');

			input.checked = true;

			/**
			 * TODO: Fix BUG when change from type of graphic after removing answer, graphic icon miss match answers.
			 */
			if (input.value == 'reaction') {

				document.getElementById('stars-icons').classList.add('hidden');
				document.getElementById('number-icons').classList.add('hidden');
				document.getElementById('reaction-icons').classList.remove('hidden');

				if (getTotalAnswers() == 5) $('#add-answer-btn').attr('disabled', true)
				else if (getTotalAnswers() <= 4) $('#add-answer-btn').attr('disabled', false)
			}
			else if (input.value == 'num') {
				document.getElementById('stars-icons').classList.add('hidden');
				document.getElementById('number-icons').classList.remove('hidden');
				document.getElementById('reaction-icons').classList.add('hidden');

				let currentBars = $(`.answer-graphic-container:not(.hidden) .answer-graphic-value`).toArray();

				currentBars.forEach( (bar, index) => {
					if (bar.querySelector('img') != null) bar.querySelector('img').remove();
					bar.querySelector('span').innerHTML = `o ${index + 1}`
				})

				$('#add-answer-btn').attr('disabled', false)
			}
			else if (input.value == 'stars') {
				document.getElementById('stars-icons').classList.remove('hidden');
				document.getElementById('number-icons').classList.add('hidden');
				document.getElementById('reaction-icons').classList.add('hidden');

				let currentGraphic = Array.from(document.querySelectorAll(`.answer-graphic-container:not(.hidden) .answer-graphic-value`));

				currentGraphic.forEach( (bar, index) => {
					if (bar.querySelector('img') != null) bar.querySelector('img').src = '../../assets/images/single_star.png';
					bar.querySelector('span').innerHTML = `x ${index + 1}`
				})

				$('#add-answer-btn').attr('disabled', false)
			}
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