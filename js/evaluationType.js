var selectedCompetences = [];
var competenceType;

$('input[name="eval-type"]').on('change', () => {
    competenceType = $('input[name="eval-type"]:checked').val();
})

$('.element-card').on('click', (event) => {
    let competenceTitle = $(event.currentTarget).children('.element-title').text();

    if (!$(event.currentTarget).hasClass('selected')) {

        $(event.currentTarget).addClass('selected');
        selectedCompetences.push(competenceTitle);

    }
    else {
        $(event.currentTarget).removeClass('selected');

        selectedCompetences = selectedCompetences.filter( competence => competence !== competenceTitle);
    }

    console.log(selectedCompetences);
});

$('.element-card').on('mouseover', (event) => {
    let cardText = $(event.currentTarget).children('.element-description');

    if (cardText[0].scrollHeight > cardText.height()) {
        $(event.currentTarget).height('200px');
        cardText.addClass('no-description-overflow');
    }
});

$('.element-card').on('mouseout', (event) => {
    let cardText = $(event.currentTarget).children('.element-description');

    $(event.currentTarget).height('132px');
    cardText.removeClass('no-description-overflow');
});

// Search
$('#type-search').keyup( event => {
    let allCards = $('.element-card').toArray();
    let searchString = $(event.currentTarget).val();

    allCards.forEach(card => {
        if (!$(card).children('.element-title').text().includes(searchString)) {
            $(card).css('display', 'none');
        }
    });

    if (searchString == '') {
        $('.element-card').css('display', 'flex');
    }

})