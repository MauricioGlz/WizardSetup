/*
* Note: 
* This is legacy code, most of it uses jQuery event delegations, 
* inner HTML code needs to be refactored to be modular and use template tag.
*/

let answerToEdit;
let answerType;
let answerConfig = [];
let totalAsnwers = 0;
let reactionWaring = false;
let scaleType = 'unit';

function getTotalAnswers() {
    return $('.answer-element').length;
}

function getScaleType() {
    return $('.level-type.active').data('value');
}

$('#scalesConfiguration').on('click', '.level-type', () => {
    $('#scale-warning').modal({show: 'true'});
});

$('#scalesConfiguration').on('click', '.edit-icon', function () {

    let graphicalType = getGraphicalType();
    answerToEdit = $(this).parents('.answer-element');
    let currentAnswerColor = answerToEdit.find('.tag').css('background-color');

    if (graphicalType == 'reaction') {
        $('#reaction-container').removeClass('hidden');
        if (getTotalAnswers() >= 6) {
            $('#reaction-upload').removeClass('hidden');
            $('#reaction-container').addClass('hidden');
        }
    }
    else $('#reaction-container').addClass('hidden');

    $('#answer-text').val('');

    if (scaleType == '100' ) {
        $('.unit-range').addClass('hidden');
        $('.100-range').removeClass('hidden');

        $('#min-range').prop('disabled', false);

        $('#max-range').prop('disabled', false);
        $('#max-range').prop('max', '100');
    }
    else {
        $('.unit-range').removeClass('hidden');
        $('.100-range').addClass('hidden');

        $('#max-range').prop('disabled', true);
        $('#min-range').prop('disabled', false);
    }
  
    $('#color-picker').spectrum('set', currentAnswerColor);

});

$('#color-picker').spectrum({
    type: "color",
    locale: "es",
    togglePaletteOnly: true,
    showButtons: true
});


function removeAnswer(event) {

    let deletetAnswer = event.currentTarget.closest('.answer-element');
    let answerNumber = $(deletetAnswer).data('number')

    
    syncBars('remove', null , answerNumber);


    $(event.currentTarget).parents('.answer-element').remove();
    totalAsnwers = getTotalAnswers();

    if (totalAsnwers <= 5 ) {
        reactionWaring = false;
        $('#reaction-upload').addClass('hidden');
        $('#reaction-container').removeClass('hidden');
    }
    if (totalAsnwers <= 2) {
        $('.like-dislike').removeClass('hidden');
        $('.emoji-reaction').addClass('hidden');
    }

    if (getGraphicalType() == 'reaction') {
        if (getTotalAnswers() >= 2) {
            $('.like-dislike').addClass('hidden');
            $('.emoji-reaction').removeClass('hidden');
        }
        if (getTotalAnswers() >= 6 && reactionWaring == false) {
            $('#reaction-limit').modal({show: 'true'});
            reactionWaring = true;
        }
        
    }
}


/** 
 * TODO: Replace internal HTML to a template style
 * */
function addAnswer() {

    $('#answers-editor').prepend(`
        <div class="form-element answer-element" data-number="${getTotalAnswers() + 1}">
            <div class="element-name">-</div>
            <div class="element-type"><div class="tag tag-red">-</div></div>
            <div class="element-tool-box">
            <div class="element-actions-container">
                <div class="action-btn default-btn edit-icon" data-toggle="modal" data-target="#answersModal" >
                    <span><i class="fas fa-pen"></i></span>
                </div>
                <div class="action-btn default-btn" onclick="removeAnswer(event)">
                    <span><i class="fas fa-trash"></i></span>
                </div>
            </div>
            </div>
            <div class="placeholder"></div>
        </div>
    `)

    syncBars('add');
    
}


/** 
 * 
*/
function syncBars(type, newValue, answerNumber) {

    if (type == 'add') {

        totalAsnwers = getTotalAnswers();
        let graphicalType = getGraphicalType();

        $('.answers-counter-container').append(`
            <div class="answer-counter" data-number="${totalAsnwers}"> - </div>`
        );

        if (graphicalType == 'stars') {
            $('.answer-graphic-container').append(`
                <div class="answer-graphic-value" data-number="${totalAsnwers}">
                    <img src="../../assets/images/single_star.png" alt="">
                    <span>x ${totalAsnwers}</span>
                </div>`
            );
        }
        else if (graphicalType == 'numbers') {
            $('.answer-graphic-container').append(`
                <div class="answer-graphic-value" data-number="${totalAsnwers}">
                    <span>o ${totalAsnwers}</span>
                </div>`
            );
        }
        else if (graphicalType == 'reaction') {
            $('.answer-graphic-container').append(`
            <div class="answer-graphic-value" data-number="${totalAsnwers}">
                <img src="../../assets/images/reaccion/neutral.png" alt="">
            </div>`
            );

            if (getTotalAnswers() == 5) $('#add-answer-btn').attr('disabled', true)
        }

        $('.answer-bar-container').append(`
            <div class="answer-bar" style="background-color: #FD2C2C;" data-number="${totalAsnwers}"></div>`
        );
    }

    if (type == 'remove') {
        let answerCounter = $(`.answer-counter[data-number="${answerNumber}"]`);
        let answerBar = $(`.answer-bar[data-number="${answerNumber}"]`);
        let answerValue = $(`.answer-graphic-value[data-number="${answerNumber}"]`);

        answerCounter.remove();
        answerBar.remove();
        answerValue.remove();
        
        $('.answer-graphic-value span').toArray().forEach( (span, index) => {
            $(span).text(`x ${index + 1}`)
        } )
        if (getGraphicalType() == 'reaction') {

            if (getTotalAnswers() - 1 <= 4) $('#add-answer-btn').attr('disabled', false)
        }
    }

    if (type == 'update') {
        let answersElements = $('.answer-element').toArray().reverse();
        let answerBars = $('.answer-bar').toArray();
        let answerCounter = $(`.answer-counter[data-number="${answerNumber}"]`)
    
        answersElements.forEach( (element, index) => {
            let bgc = $(element).find('.tag').css('background-color');
            $(answerBars[index]).css('background-color', bgc);
        })
        answerCounter.text(newValue);
    }

    if (type == 'style') {
        const defaults = document.getElementById('defaults').content.cloneNode(true);
        const area = document.getElementById('scale-editor-area');
        area.innerHTML = '';
        area.appendChild(defaults);

        let scale = [];
        let type = getScaleType();
        let answers = $('.answer-element').toArray();
        let counters = $('.answer-counter').toArray();


        if (type == '100') {
            scale = ["0 - 20", "21 - 40", "41 - 60", "61 - 80", "81 -100"];
        }
        if (type == 'unit') {
            scale = ["1", "2", "3", "4", "5"];
        }

        answers.forEach( (answer, index) => {
            $(answer).find('.tag').text(scale.reverse()[index]);
        })

        counters.forEach( (counter, index) => {
            counter.innerText =`${scale.reverse()[index]}`;
        })
    }

}

function getGraphicalType() {
    return  $('input[name="graphical-type"]:checked').val();
}

function updateAnswer() {
    let newColor = $("#color-picker").val();
    let newAnswerText = $('#answer-text').val();
    let newAnswerValue = $('#answer-value').val();
    let newMinRange = $('#min-range').val();
    let newMaxRange = $('#max-range').val();
    let isMaxRangeDisabled = $('#max-range').prop('disabled');
    let answerTag = answerToEdit.find('.tag');
    let answerNumber = $(answerToEdit).data('number');

    answerTag.css('background-color', newColor);

    if (newAnswerText != '') answerToEdit.find('.element-name').text(newAnswerText);
    
    if (isMaxRangeDisabled) answerToEdit.find('.tag').text(newAnswerValue);
    
    if (isMaxRangeDisabled == false) {

        if (newMaxRange > 100) {
            alert('Por favor coloca un rango entre 1 - 100');
        } else {
            let newRange = `${newMinRange.toString()} - ${newMaxRange.toString()}`
            answerToEdit.find('.tag').text(newRange);
        }
    }

    syncBars('update', newAnswerValue, answerNumber)
}