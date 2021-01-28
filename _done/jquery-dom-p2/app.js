// Build an application that uses jQuery to do the following:

// Contains a form with two inputs for a title and rating along with a button to submit the form.
// When the form is submitted, capture the values for each of the inputs and
// append them to the DOM along with a button to remove each title and rating from the DOM.
// When the button to remove is clicked, remove each title and rating from the DOM.

$(document).ready(function () {
    $("#submit").on("click", function (e) {
        e.preventDefault();
        console.log("submit clicked!");
        let rating = $("#rating").val();
        let title = $("#title").val();
        let html = `<div class="removeItem"><button>remove</button> ${rating} ${title}</div>`
        $(".list").append(html);

        $(".removeItem").on("click", function(e) {
            $(e.target.parentElement).remove();
            console.log("remove item");
        });
    })
});