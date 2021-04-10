$( "#first_name" ).change(function() {
    let init_first_name = $('#init_first_name').val();
    let first_name = $('#first_name').val();
    if (init_first_name != first_name) {
        $('#first_name').toggleClass("is-valid", false);
        $('#first_name').toggleClass("is-invalid", true);
    } else {
        $('#first_name').toggleClass("is-valid", true);
        $('#first_name').toggleClass("is-invalid", false);
    }
    console.log( "Handler for first_name() called." );
});

$( "#last_name" ).change(function() {
    let init_last_name = $('#init_last_name').val();
    let last_name = $('#last_name').val();
    if (init_last_name != last_name) {
        $('#last_name').toggleClass("is-valid", false);
        $('#last_name').toggleClass("is-invalid", true);
    } else {
        $('#last_name').toggleClass("is-valid", true);
        $('#last_name').toggleClass("is-invalid", false);
    }

    console.log( "Handler for last_name() called." );
});

$( "#image_url" ).change(function() {
    let init_image_url = $('#init_image_url').val();
    let image_url = $('#image_url').val();
    if (init_image_url != image_url) {
        $('#image_url').toggleClass("is-valid", false);
        $('#image_url').toggleClass("is-invalid", true);
    } else {
        $('#image_url').toggleClass("is-valid", true);
        $('#image_url').toggleClass("is-invalid", false);
    }

    console.log( "Handler for image_url() called." );
});

$('#cancel').on('click', function (e) {
    $('#form').prop('action', `/users`);
    console.log("click : cancel")
})

$('#delete').on('click', function (e) {
    let user_id = parseInt($('#init_user_id').val());
    $('#form').prop('action', `/users/${user_id}/delete`);
    console.log("click : delete")
})

$('#submit').on('click', function (e) {
    let user_id = parseInt($('#init_user_id').val());
    $('#form').prop('action', `/users/${user_id}/edit`);
    console.log("click : submit")
})

$(function() {
    $('#toggle-edit-mode').change(function() {
        let text = ""
        if ($(this).prop('checked')) {
            text = "Edit Mode";
            $('#submit').prop('disabled', false);
            $('#first_name').prop('disabled', false);
            $('#last_name').prop('disabled', false);
            $('#image_url').prop('disabled', false);
        } else {
            text = "View Mode";
            $('#submit').prop('disabled', true);
            $('#first_name').prop('disabled', true);
            $('#last_name').prop('disabled', true);
            $('#image_url').prop('disabled', true);
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