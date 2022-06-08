import { loadHTML } from "./loadExternals.js";


let currentTab = 0; // Current tab is set to be the first tab (0)
let lastStep = 0;

async function showTab(n) {

    await loadPages();
    // This function will display the specified tab of the form ...
    var x = document.getElementsByClassName("tab");
    x[n].style.display = "block";

    // ... and fix the Previous/Next buttons:
    if (n == 0) {
        
        document.getElementById("prevBtn").style.opacity = 0;
    } else {
        reverseAnimations();
        if (n == 2) updateCatCounters();
        document.getElementById("prevBtn").style.opacity = 1;
        document.getElementById("prevBtn").style.display = "inline";
    }
    /* if (n == (x.length - 1)) {
        document.getElementById("nextBtn").innerHTML = "";
    } else {
        document.getElementById("nextBtn").innerHTML = "";
    } */
    

}

function nextPrev(n) {
    // This function will figure out which tab to display
    var x = document.getElementsByClassName("tab");

    // Hide the current tab:
    x[currentTab].style.display = "none";
    // Increase or decrease the current tab by 1:
    currentTab = currentTab + n;

    switch (currentTab) {
        case 1:
            localStorage.removeItem('evalName');
            localStorage.setItem('evalName', $('#evalName').val());
            break;

        case 2:
            localStorage.removeItem('selectedCompetences');
            localStorage.setItem('selectedCompetences', JSON.stringify(selectedCompetences));
            localStorage.removeItem('competenceType');
            localStorage.setItem('competenceType', competenceType);
            
            break;

        case 3:
            let competenceCards = [];
            $('#competences-resume-card').toArray().forEach(card => {
                competenceCards.push($(card).html()) 
            });
            localStorage.removeItem('questions');
            localStorage.setItem('questions', JSON.stringify(selectedQuestions));
            localStorage.removeItem('competenceCards');
            localStorage.setItem('competenceCards', JSON.stringify(competenceCards));

            break;

        case 4:
            let answersElements = $('#answers-editor').find('.answer-element').toArray();
            answersElements.forEach(element => {
                let text = $(element).find('.element-name').text();
                let val = $(element).find('.tag').text();
                let color = $(element).find('.tag').css('background-color');
                answerConfig.push({text, val, color});
            });
            let answerScaleGraph = $("#answer-bar-preview").html();
            localStorage.removeItem('answerType');
            localStorage.setItem('answerType', answerType);
            localStorage.removeItem('answerConfig');
            localStorage.setItem('answerConfig', JSON.stringify(answerConfig));
            localStorage.removeItem('answerScaleGraph');
            localStorage.setItem('answerScaleGraph', answerScaleGraph);

            break;

        case 5:
            localStorage.removeItem('employeesToTest');
            localStorage.setItem('employeesToTest', JSON.stringify(employeesToTest));
            loadEvaluatorsConfig(employeesToTest);
            break;

        case 6:
            let selectedEvaluators = []
            localStorage.removeItem('selectedEvaluators');
            localStorage.setItem('selectedEvaluators', JSON.stringify(selectedEvaluators));
            //clearResume();
            //loadResume();
            break;
    
        default:
            break;
    }

    // if you have reached the end of the form... :
    if (currentTab >= x.length) {
        //...the form gets submitted:
        document.getElementById("configWizard").submit();
        return false;
    }
    // Otherwise, display the correct tab:
    showTab(currentTab);
}



function loadPages() {
    const pages = [
        'newEvaluation',
        'evaluationStyle',
        /* 'evaluationConfig',
        'remindersConfig',
        'competences',
        'behaviors',
        'values',
        'principles',
        'evaluationType',
        'scalesConfiguration',
        'openQuestions',
        'newtworkCreation',
        'masiveNetwork',
        'organigramNetwork',
        'manualNetwork',
        'networkGrades' */
    ];
    return new Promise ( async (resolve) => {

        for(const page of pages) {
            await loadHTML(`${page}`, `./pages/${page}/index.html`);
        }
        resolve(true);
    })

}

document.getElementById('nextBtn').addEventListener('click', () => {
    nextPrev(1);
});

document.getElementById('prevBtn').addEventListener('click', () => {
    nextPrev(-1);
})

$(document).ready( function() {
    /* $('#evalName').val('');
    $('#min-range').val('');
    $('#max-range').val('');
    $('#stars-type').prop('checked', true);
    $('#unit-scale').prop('checked', true); */

    // Display the current tab
    showTab(currentTab); 

})


