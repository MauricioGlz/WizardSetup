var selectedQuestions = [];

$('input[name="questionVisible"]').on('change', (event) => {
    let currentCat = $('#cateogry-type').val();
    let currentQuestion = $(event.currentTarget).parents('.form-element').find('.element-name').text();
    let activeCatQuestions = $('input[name="questionVisible"]:checked').length;
    
    $(`#${currentCat}`).html(activeCatQuestions);

    if ( $(event.currentTarget).is(':checked') )
        selectedQuestions.push({category: currentCat, queston: currentQuestion});
    else {
        selectedQuestions = selectedQuestions.filter(selected => selected.queston !== currentQuestion )
    }

    console.log(selectedQuestions)
})

function updateCatCounters() {
    let currentCat = $('#cateogry-type').val();
    let activeCatQuestions = $('input[name="questionVisible"]:checked').length;
    
    $(`#${currentCat}`).html(activeCatQuestions);
}