$('#cancel').on('click', function (e) {
    let post_id = parseInt($('#init_post_id').val());
    $('#form').prop('action', `/posts/${post_id}`);
    $('#form').prop('method', "GET");
    console.log("click : cancel")
})


$('#submit').on('click', function (e) {
    let post_id = parseInt($('#init_post_id').val());
    $('#form').prop('action', `/posts/${post_id}/tags/select`);
    $('#form').prop('method', "POST");
    console.log("click : submit")
})


$(function () {
    $('#toggle-edit-mode').change(function () {
        let text = ""
        if ($(this).prop('checked')) {
            text = "Edit Mode";
            $('#submit').prop('disabled', false);
        } else {
            text = "View Mode";
            $('#submit').prop('disabled', true);
        }
        $('#toggle-edit-text').html(text);
    })
})


$(document).ready(function () {
    let edit_mode = $('#edit_mode').val();
    if (edit_mode == "edit") {
        $('#toggle-edit-mode').bootstrapToggle('on')
    } else { // assume edit_mode == "view"
        $('#toggle-edit-mode').bootstrapToggle('off')
    }

    console.log("document is ready");
});