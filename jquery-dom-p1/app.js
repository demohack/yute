
$(document).ready(function(){
  // When the DOM is ready, console.log the message “Let’s get ready to party with jQuery!”
  console.log("Let's get ready to party with jQuery!");

  // Give all images inside of an article tag the class of image-center (this class is defined inside of the style tag in the head).
  $("article img").addClass("image-center");

  // Remove the last paragraph in the article.
  $("article p:last-child").remove();

  // Set the font size of the title to be a random pixel size from 0 to 100.
  $("#title").css("font-size", `${Math.floor(Math.random() * 101)}px`);

  // Add an item to the list; it can say whatever you want.
  // let li = document.createElement("li");
  // li.innerText = "Hello world";
  // $("aside ol").append(li);
  $("ol").append($("<li>", {text: "I can add to lists with jQuery!"}));

  // Scratch that; the list is silly. Empty the aside and put a paragraph in it apologizing for the list’s existence.
  // $("aside").empty();
  // $("aside").html("Apologies for the list.");
  $("aside")
      .empty()
      .append($("<p>", {text: "Sorry about that list :("}));

  // When you change the numbers in the three inputs on the bottom, the background color of the body should change to match whatever the three values in the inputs are.
  $(".form-control").on("keyup blur change", function() {
      let elem =$(".form-control");
      let r = elem.eq(0).val();
      let g = elem.eq(1).val();
      let b = elem.eq(2).val();
      console.log(`rgb(${r}, ${g}, ${b})`);
      $("body").css("background-color",`rgb(${r}, ${g}, ${b})`);
  });

  // Add an event listener so that when you click on the image, it is removed from the DOM.
  $("img").on("click", function(e) {
      $(e.target).remove();
  });
});
