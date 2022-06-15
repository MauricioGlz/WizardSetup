let isSelected = false;
let reminders = [];

function createReminder() {

    clearConfig();
    document.getElementById('reminder-controls').style.display = 'block';
}

function addReminderEvents() {
    document.getElementById('add-reminder').addEventListener('click', createReminder);
    document.getElementById('save-reminder-btn').addEventListener('click', addReminder)
}

function addReminder() {
    document.getElementById('reminder-controls').style.display = 'block';
    let reminderEditor = document.getElementById('reminders-text-editor').__quill;
    const title = document.getElementById('reminder-title').value;
    const date = document.getElementById('reminder-date').value;
    const applyFor = document.getElementById('apply-for').value;
    const content = reminderEditor.root.innerHTML;

    if (!isSelected) {

        const template = document.getElementById('reminder-template').content.cloneNode(true);

        template.querySelector('.reminder-text').innerText = title;
        template.querySelector('.tag').innerText = date;
        template.querySelector('.reminder-container').setAttribute('data-content', content);
        template.querySelector('.reminder-container').setAttribute('data-apply-for', applyFor);
        document.getElementById('empty-reminder-text').style.display = 'none'
        document.getElementById('reminders-list').appendChild(template);

        document.getElementsByClassName('reminder-container')[document.getElementsByClassName('reminder-container').length - 1].addEventListener('click', event => {
            loadReminder(event)
        })
    } else {
        let selected = document.querySelector('.reminder-container.active');

        selected.querySelector('.reminder-text').innerText = title;
        selected.querySelector('.tag').innerText = date;
        selected.setAttribute('data-content', content)
    }

    reminders.push({title, date, applyFor, content});
    clearConfig()

}

function clearConfig() {
    let reminderEditor = document.getElementById('reminders-text-editor').__quill;
    document.getElementById('reminder-title').value = '';
    document.getElementById('reminder-date').value = '';
    reminderEditor.root.innerHTML = '';
    document.getElementById('reminder-controls').style.display = 'none';
    Array.from(document.getElementsByClassName('reminder-container')).forEach(reminder => reminder.classList.remove('active'))
    isSelected = false;
}

function loadReminder(event) {

    const reminder = event.currentTarget;

    Array.from(document.getElementsByClassName('reminder-container')).forEach(reminder => reminder.classList.remove('active'))

    if (!reminder.classList.contains('active')) {
        reminder.classList.toggle('active');
        document.getElementById('reminder-controls').style.display = 'block';

        const title = reminder.querySelector('.reminder-text').innerText;
        const date = reminder.querySelector('.tag').innerText;
        const content = reminder.getAttribute('data-content');
        const applyFor = reminder.getAttribute('data-apply-for');

        let reminderEditor = document.getElementById('reminders-text-editor').__quill;

        document.getElementById('reminder-title').value = title;
        document.getElementById('reminder-date').value = date;
        document.getElementById('apply-for').value = applyFor;
        reminderEditor.root.innerHTML = content;
    }
    isSelected = true;
}

function storeReminders() {
    localStorage.setItem('reminders', JSON.stringify(reminders));
}


export { addReminderEvents, storeReminders }