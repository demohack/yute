function runme() {

    // a. Select the section with an id of container without using querySelector.
    let s1 = document.getElementById("container");

    // b. Select the section with an id of container using querySelector.
    let s2 = document.querySelector("#container");

    // c. Select all of the list items with a class of “second”.
    let s3 = document.querySelectorAll("li.second")

    // d. Select a list item with a class of third, but only the list item inside of the ol tag.
    let s4 = document.querySelector("ol > li.third")

    // e. Give the section with an id of container the text “Hello!”.
    let s5 = document.querySelector("#container");
    let v5 = s5.innerHTML;
    s5.innerHTML = "Hello!";
    s5.innerHTML = v5;

    // f. Add the class main to the div with a class of footer.
    let s6 = document.querySelector("div.footer");
    s6.classList.add("main");

    // g. Remove the class main on the div with a class of footer.
    s6.classList.remove("main");

    // h. Create a new li element.
    let li8 = document.createElement("li");

    // i. Give the li the text “four”.
    li8.innerText = "four";

    // j. Append the li to the ul element.
    let s10 = document.querySelector("ul");
    s10.append(li8);

    // k. Loop over all of the lis inside the ol tag and give them a background color of “green”.
    let s11 = document.querySelectorAll("ol > li");
    s11.forEach(e => {
        e.style.backgroundColor = "green";
    });

    // l. Remove the div with a class of footer
    let s12 = document.querySelector("div.footer");
    s12.remove();

}
