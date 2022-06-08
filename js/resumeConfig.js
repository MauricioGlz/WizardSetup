$('.final-switch').on('change', function () {
    let prop = $(this).attr('id');
    if ($(this).is(':checked')) localStorage.setItem(`${prop}`, `${$(this).val()}`)
    else localStorage.removeItem(`${prop}`) 
})

function addReminder() {
    let reminders = $('.reminders-panel').children().length;
    if (reminders < 3)
        $('#addReminderModal').show();
}

function saveReminder() {
    let title = $('#reminder-title').val();
    let date = $('#reminder-date').val(); 
     

    $('#addReminderModal').hide();
    renderReminder({title, date});
}

function removeReminder(event) {
    $(event.currentTarget).parents('.form-element').remove()
    let reminders = $('.reminders-panel').children().length;
    if (reminders < 3) $('#add-reminder-btn').removeClass('disabled-btn')
}

function renderReminder(reminder) {
    
    let reminderEl = `
        <div class="form-element answer-element">
            <div class="element-name">${reminder.title}</div>
            <div class="element-type"><div class="tag tag-blue">${reminder.date}</div></div>
            <div class="element-tool-box">
                <div class="element-actions-container">
                    <div class="action-btn default-btn edit-icon" >
                        <span class="iconify" data-inline="false" data-icon="bx:bx-edit" style="font-size: 19px;"></span>
                    </div>
                    <div class="action-btn delete-btn" onclick="removeReminder(event)">
                        <span class="iconify" data-inline="false" data-icon="ic:baseline-delete" style="color: #ffffff; font-size: 19.636363983154297px;"></span>
                    </div>
                </div>
            </div>
            <div class="placeholder"></div>    
        </div>
    `
    
    $('.reminders-panel').append(reminderEl);
    let reminders = $('.reminders-panel').children().length;

    if (reminders == 3) $('#add-reminder-btn').addClass('disabled-btn')
}


