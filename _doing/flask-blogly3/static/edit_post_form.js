$( "#title" ).change(function() {
    let init_title = $('#init_title').val();
    let title = $('#title').val();
    if (init_title != title) {
        $('#title').toggleClass("is-valid", false);
        $('#title').toggleClass("is-invalid", true);
    } else {
        $('#title').toggleClass("is-valid", true);
        $('#title').toggleClass("is-invalid", false);
    }
    console.log( "Handler for title() called." );
});

$( "#content" ).change(function() {
    let init_content = $('#init_content').val();
    let content = $('#content').val();
    if (init_content != content) {
        $('#content').toggleClass("is-valid", false);
        $('#content').toggleClass("is-invalid", true);
    } else {
        $('#content').toggleClass("is-valid", true);
        $('#content').toggleClass("is-invalid", false);
    }

    console.log( "Handler for content() called." );
});

$('#cancel').on('click', function (e) {
    let user_id = parseInt($('#init_user_id').val());
    $('#form').prop('action', `/users/${user_id}`);
    console.log("click : cancel")
})

$('#delete').on('click', function (e) {
    let post_id = parseInt($('#init_post_id').val());
    $('#form').prop('action', `/posts/${post_id}/delete`);
    console.log("click : delete")
})

$('#submit').on('click', function (e) {
    let post_id = parseInt($('#init_post_id').val());
    $('#form').prop('action', `/posts/${post_id}/edit`);
    console.log("click : submit")
})

$(function() {
    $('#toggle-edit-mode').change(function() {
        let text = ""
        if ($(this).prop('checked')) {
            text = "Edit Mode";
            $('#submit').prop('disabled', false);
            $('#title').prop('disabled', false);
            $('#content').prop('disabled', false);
        } else {
            text = "View Mode";
            $('#submit').prop('disabled', true);
            $('#title').prop('disabled', true);
            $('#content').prop('disabled', true);
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