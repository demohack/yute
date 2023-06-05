$('#next').on('click', function (e) {
    let question_id = parseInt($('#question-id').val());
    $('#form').prop('action', `/answer/${question_id}`);    // record the answer to current question
    question_id = question_id + 1
    $('#next-question-id').prop('value', question_id);      // determine next queestion to display
    console.log("click : next")
})

$('#back').on('click', function (e) {
    let question_id = parseInt($('#question-id').val());
    $('#form').prop('action', `/answer/${question_id}`);    // record the answer to current question
    question_id = question_id - 1
    $('#next-question-id').prop('value', question_id);      // determine next queestion to display
    console.log("click : back")
})

$('#submit').on('click', function (e) {
    let question_id = parseInt($('#question-id').val());
    $('#form').prop('action', `/complete/${question_id}`);    // record the answer to current question
    console.log("click : submit")
})

$(document).ready(function () {
    let question_id = parseInt($('#question-id').val());
    let num_questions = parseInt($('#num-questions').val());
    let saved_choice = $('#saved-choice').val();

    if (saved_choice != "") {
        $(`input[name=choice][value='${saved_choice}']`).prop("checked", true);
    }
    
    if (question_id == 0) {
        $('#back').prop('disabled', true);
    }

    if (question_id == num_questions - 1) {
        $('#next').prop('disabled', true);
    }

    // set choice
    console.log("document is ready");
});