$( "#tag_name" ).change(function() {
    let init_tag_name = $('#init_tag_name').val();
    let tag_name = $('#tag_name').val();
    if (init_tag_name != tag_name) {
        $('#tag_name').toggleClass("is-valid", false);
        $('#tag_name').toggleClass("is-invalid", true);
    } else {
        $('#tag_name').toggleClass("is-valid", true);
        $('#tag_name').toggleClass("is-invalid", false);
    }
    console.log( "Handler for tag_name() called." );
});

$('#cancel').on('click', function (e) {
    $('#form').prop('action', `/tags`);
    $('#form').prop('method', "GET");
    console.log("click : cancel")
})

$('#delete').on('click', function (e) {
    let tag_id = parseInt($('#init_tag_id').val());
    $('#form').prop('action', `/tags/${tag_id}/delete`);
    $('#form').prop('method', "POST");
    console.log("click : delete")
})

$('#submit').on('click', function (e) {
    let tag_id = parseInt($('#init_tag_id').val());
    $('#form').prop('action', `/tags/${tag_id}/edit`);
    $('#form').prop('method', "POST");
    console.log("click : submit")
})

$(function() {
    $('#toggle-edit-mode').change(function() {
        let text = ""
        if ($(this).prop('checked')) {
            text = "Edit Mode";
            $('#submit').prop('disabled', false);
            $('#tag_name').prop('disabled', false);
        } else {
            text = "View Mode";
            $('#submit').prop('disabled', true);
            $('#tag_name').prop('disabled', true);
        }
      $('#toggle-edit-text').html(text);
    })
  })


$(document).ready(function () {
    let edit_mode = $('#edit_mode').val();
    if (edit_mode == "edit") {
        $('#toggle-edit-mode').bootstrapToggle('on')
    } else {    // assume edit_mode == "view"
        $('#toggle-edit-mode').bootstrapToggle('off')
    }

    console.log("document is ready");
});