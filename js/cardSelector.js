/* Note: This is legacy code, it uses jQuery event delegations,
needs to be refactored to be modular*/

var selectedCompetences = [];
var competenceType;

$('#competences').on('click', '.element-card', (event) => {
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

$('#competences').on('mouseover', '.element-card', (event) => {
    let cardText = $(event.currentTarget).children('.element-description');

    if (cardText[0].scrollHeight > cardText[0].offsetHeight) {
        $(event.currentTarget).height('210px');
        cardText.addClass('no-description-overflow');
    }
});

$('#competences').on('mouseout', '.element-card', (event) => {
    let cardText = $(event.currentTarget).children('.element-description');

    $(event.currentTarget).height('140px');
    cardText.removeClass('no-description-overflow');
});

// Search
$('#competences').on('keyup', '#type-search', (event) => {
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