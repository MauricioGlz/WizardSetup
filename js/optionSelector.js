function selectOption(el) {
    document.querySelectorAll('.active-card').forEach( card => {
      card.classList.remove('active-card')  
    })
    el.classList.toggle('active-card');
}