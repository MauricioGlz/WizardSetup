import { loadHTML } from "./loadExternals.js";
import { storeNewEvaluation } from "./newEvaluation.js";
import { storeOption, addEventsToCards, allowGraphicalSelector, allowOptionBtns } from "./optionSelector.js";
import { storeConfig, storeWelcomeMessage } from "./evaluationConfig.js";
import { addReminderEvents, storeReminders } from "./reminders.js";
import { allowModalsEvents } from "./modal.js";


let currentTab = 9; // Current tab is set to be the first tab (0)
let lastStep = 0;

async function showTab(n) {
    // This function will display the specified tab of the form ...
    var x = document.getElementsByClassName("tab");
    x[n].style.display = "block";

    // ... and fix the Previous/Next buttons:
    if (n == 0) {

        document.getElementById("prevBtn").style.opacity = 0;
    } else {
        //if (n == 2) updateCatCounters();
        document.getElementById("prevBtn").style.opacity = 1;
        document.getElementById("prevBtn").style.display = "inline";
    }

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
            storeNewEvaluation();
            break;

        case 2:
            storeOption();
            break;

        case 3:
            storeConfig();
            storeWelcomeMessage();

            break;

        case 4:
            storeReminders();
            break;

        case 5:
            /* Legacy code, needs to be refactorized to use modular structure */
            localStorage.removeItem('selectedCompetences');
            localStorage.setItem('selectedCompetences', JSON.stringify(selectedCompetences));

            break;
        case 6:
            /* Legacy code, needs to be refactorized to use modular structure */
            let competenceCards = [];
            $('#competences-resume-card').toArray().forEach(card => {
                competenceCards.push($(card).html())
            });
            localStorage.removeItem('behaviors');
            localStorage.setItem('behaviors', JSON.stringify(selectedBehaviors));
            localStorage.removeItem('competenceCards');
            localStorage.setItem('competenceCards', JSON.stringify(competenceCards));

            break;

        case 7:
            break;

        case 8:
            break;

        case 9:
            storeOption();
            break;

        default:
            break;
    }

    // if you have reached the end of the form... :
    if (currentTab >= x.length) {
        //...the form gets submitted:

        return false;
    }
    // Otherwise, display the correct tab:
    showTab(currentTab);
}



function loadPages() {
    const pages = [
        'newEvaluation',
        'evaluationStyle',
        'evaluationConfig',
        'remindersConfig',
        'competences',
        'behaviors',
        'values',
        'principals',
        'evaluationType',
        'scalesConfiguration',
        /* 
        'openQuestions',
        'newtworkCreation',
        'masiveNetwork',
        'organigramNetwork',
        'manualNetwork',
        'networkGrades' */
    ];
    return new Promise(async (resolve) => {

        for (const page of pages) {
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


function createFinalJson() {
    let data = {};


}

$(document).ready(async function () {

    await loadPages();
    let welcomeMessage = document.getElementById('welcome-text-editor');
    let reminderMessage = document.getElementById('reminders-text-editor');

    showTab(currentTab);
    initQuillTextEditor([welcomeMessage, reminderMessage]);
    addEventsToCards();
    allowGraphicalSelector();
    allowOptionBtns();
    addReminderEvents();

})
