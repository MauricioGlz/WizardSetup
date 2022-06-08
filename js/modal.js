// Get the modal
var modal = document.getElementById("myWarningModal");
var editAnswerModal = document.getElementById("editAnswer");
var addReminderModal = document.getElementById('addReminderModal');

// Get the button that opens the modal
var btn = document.getElementById("warningModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
var spanEdit = document.getElementsByClassName("close")[1];
var spanReminder = document.getElementsByClassName("close")[2];

var closeBnt = document.getElementsByName("close")[0];
var closeEditBnt = document.getElementsByName("closeEdit")[0];
var closeReminderBtn = document.getElementsByName("closeReminder")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
  $('b[name="test-name"]').html('');
  $('b[name="test-name"]').append(localStorage.getItem('evalName'));
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks on <span> (x), close the modal
spanEdit.onclick = function() {
  editAnswerModal.style.display = "none";
}

// When the user clicks on <span> (x), close the modal
spanReminder.onclick = function() {
  addReminderModal.style.display = "none";
}

// When the user clicks on <span> (x), close the modal
closeBnt.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks on <span> (x), close the modal
closeEditBnt.onclick = function() {
  editAnswerModal.style.display = "none";
  updateAnswer();
  syncColors();
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }

  if (event.target == editAnswerModal) {
    editAnswerModal.style.display = "none";
  }

  if (event.target == addReminderModal) {
    addReminderModal.style.display = "none";
  }
}
