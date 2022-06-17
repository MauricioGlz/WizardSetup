/* Note: This is legacy code, it uses jQuery event delegations,
needs to be refactored to be modular*/

var selectedBehaviors = [];

$('#behaviors').on('change', 'input[name="questionVisible"]', (event) => {
    let currentCat = $('#cateogry-type').val();
    let currentQuestion = $(event.currentTarget).parents('.form-element').find('.element-name').text();
    let activeCatQuestions = $('input[name="questionVisible"]:checked').length;
    
    $(`#${currentCat}`).html(activeCatQuestions);

    if ( $(event.currentTarget).is(':checked') )
        selectedBehaviors.push({category: currentCat, queston: currentQuestion});
    else {
        selectedBehaviors = selectedBehaviors.filter(selected => selected.queston !== currentQuestion )
    }

    console.log(selectedBehaviors)
})

function updateCatCounters() {
    let currentCat = $('#cateogry-type').val();
    let activeCatQuestions = $('input[name="questionVisible"]:checked').length;
    
    $(`#${currentCat}`).html(activeCatQuestions);
}