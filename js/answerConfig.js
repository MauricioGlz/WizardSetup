/* 
Note: 
This is legacy code, it uses jQuery event delegations, inner HTML code
needs to be refactored to be modular and use template tag.
*/

var answerToEdit;
var answerType;
var answerConfig = [];

$('#scalesConfiguration').on('change', 'input[name="answer-type"', (event) => {

    let selectedVal = $(event.currentTarget).val()
    if ($(event.currentTarget).is(':checked') && selectedVal == 'stars') {
        $('#text-answer-configurator').hide();
        $('#answer-preview-img').show();
        $('#answer-preview-img').css('background-image', 'url("assets/images/respuesta_estrella.png")');

    }

    if ($(event.currentTarget).is(':checked') && selectedVal == 'number') {
        $('#text-answer-configurator').hide();
        $('#answer-preview-img').show();
        $('#answer-preview-img').css('background-image', 'url("assets/images/respuesta_numero.png")');
    }
    
    if ($(event.currentTarget).is(':checked') && selectedVal == 'text') {
        $('#answer-preview-img').hide();
        $('#text-answer-configurator').show();
    }

    answerType = selectedVal;

});

$('#scalesConfiguration').on('change', 'input[name="scale-type"]', (event) => {
    let scaleType = $(event.currentTarget).val();
    let answers = $('.answer-element').toArray();
    const scale100 = ["0 - 20", "21 - 40", "41 - 60", "61 - 80", "81 -100"].reverse();
    const scaleUnit = ["1", "2", "3", "4", "5"].reverse();

    if ($(event.currentTarget).is(':checked') && scaleType == 'unit') {
        answers.forEach( (answer, index) => {
            $(answer).find('.tag').text(scaleUnit[index]);
            
        })
    }

    if ($(event.currentTarget).is(':checked') && scaleType == '100') {
        answers.forEach( (answer, index) => {
            $(answer).find('.tag').text(scale100[index]);
            
        })
    }
});

$('#scalesConfiguration').on('click', '.edit-icon', function () {
    $('#answer-text').val('');
    answerToEdit = $(this).parents('.answer-element');
    let totalAnswers = $('.answer-element').length;
    let currentAnswerColor = answerToEdit.find('.tag').css('background-color');


    if ($('#unit-100').is(':checked') ) {
        $('#min-range').prop('disabled', false);

        $('#max-range').prop('disabled', false);
        $('#max-range').prop('max', '100');
    }
    else {
        if (totalAnswers >= 5) {
            $('#max-range').prop('disabled', true);
        }
        else {
            $('#max-range').prop('disabled', true);

            $('#min-range').prop('max', '5');
            $('#min-range').prop('disabled', false);
        }
    }

    let currentAnswerText = $(this).parents('.answer-element').find('.element-name').text();
  
    $('#color-picker').spectrum('set', currentAnswerColor);

});

$('#color-picker').spectrum({
    type: "color",
    locale: "es",
    togglePaletteOnly: true,
    showButtons: false
});


function removeAnswer(event) {
    let totalAsnwers = $('.answer-element').length;
    let totalBarsArr = $('.answer-counter').toArray();

    $(event.currentTarget).parents('.answer-element').remove();

    if (totalAsnwers <=5) {
        $('#addAnswer').prop('disabled', false);
        $('#addAnswer').removeClass('disabled-btn');
    }
    
    // Checks if answers were added manually to remove first or last
    if ($.trim($('.answer-counter').first().text())  != '-') {
        
        $('.answer-counter').last().remove();
        $('.answer-bar').last().remove();

        if ( parseInt( $('.answer-counter').first().text() ) != 3 && parseInt( $('.answer-counter').first().text() ) != 4) {
            totalBarsArr.forEach((element, index) => {
                let currentVal = parseInt($(element).text());
                $(element).text(currentVal + 1);
            });
        }
    } 
    else  {
        
        $('.answer-counter').first().remove();
        $('.answer-bar').first().remove();
    }

    syncColors();
}


/** 
 * TODO: Replace internal HTML to a template style
 * */
function addAnswer() {
    let totalAsnwers = $('.answer-element').length;

    $('#answers-editor').append(`
        <div class="form-element answer-element">
            <div class="element-name">No cumple las expectativas</div>
            <div class="element-type"><div class="tag tag-red">-</div></div>
            <div class="element-tool-box">
                <div class="element-actions-container">
                    <div class="action-btn default-btn edit-icon" >
                        <span class="iconify" data-inline="false" data-icon="bx:bx-edit" style="font-size: 19px;"></span>
                    </div>
                    <div class="action-btn delete-btn" onclick="removeAnswer(event)">
                        <span class="iconify" data-inline="false" data-icon="ic:baseline-delete" style="color: #ffffff; font-size: 19.636363983154297px;"></span>
                    </div>
                </div>
            </div>
            <div class="placeholder"></div>
        </div>
    `)

    $('.answers-counter-container').prepend('<div class="answer-counter"> - </div>');
    $('.answer-bar-container').prepend(' <div class="answer-bar" style="background-color: #FD2C2C;"></div>');

    if (totalAsnwers + 1 == 5) {
        $('#addAnswer').prop('disabled', true);
        $('#addAnswer').addClass('disabled-btn');
    }
    
}

function syncColors() {
    let answersElements = $('.answer-element').toArray().reverse();
    let answerBars = $('.answer-bar').toArray();

    answersElements.forEach( (element, index) => {
        let bgc = $(element).find('.tag').css('background-color');
        $(answerBars[index]).css('background-color', bgc);
    })
}


function updateAnswer() {
    let newColor = $("#color-picker").val();
    let newAnswerText = $('#answer-text').val();
    let newMinRange = $('#min-range').val();
    let newMaxRange = $('#max-range').val();
    let isMaxRangeDisabled = $('#max-range').prop('disabled');
    let answerTag = answerToEdit.find('.tag');

    answerTag.css('background-color', newColor);

    if (newAnswerText != '') answerToEdit.find('.element-name').text(newAnswerText);
    
    if (isMaxRangeDisabled) answerToEdit.find('.tag').text(newMinRange);
    
    if (isMaxRangeDisabled == false) {

        if (newMaxRange > 100) {
            alert('Por favor coloca un rango entre 1 - 100');
        } else {
            let newRange = `${newMinRange.toString()} - ${newMaxRange.toString()}`
            answerToEdit.find('.tag').text(newRange);
        }
    }
}