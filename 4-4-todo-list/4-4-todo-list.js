"use strict"
// implement a todo list
// if there's time:
//      implement urgency
//      allow user to task move up and down

let controlboard = null; // control board
let todolist = null; // todo list

let newtask = null;
let duedate = null;
let urgency = null;

let modelItem = null;

window.addEventListener("load", function (e) {
    console.log(`load h: ${document.body.clientHeight} w: ${document.body.clientWidth}`)

    controlboard = document.querySelector("#controlboard");
    todolist = document.querySelector("#todolist");

    newtask = document.querySelector("#newtask");
    duedate = document.querySelector("#duedate");
    urgency = document.querySelector("#urgency");

    modelItem = document.querySelector("#modelItem");

    controlboard.addEventListener("click", controlboard_onclick);
    todolist.addEventListener("click", todolist_onclick);

    console.log('page is fully loaded');
});

function loadTodoItemList(firstID) {
    // given an ID,
    // get the first todoItem,
    //      and keep on getting the next todoItem
    //      until no more next
}

function controlboard_onclick(e) {
    e.preventDefault();

    let target = e.target;
    if (target.matches("#submitTask")) {
        submitNewTask(e);
    }
}

// TODO: append to top of list
//       assign ID
//       increment the next ID
//       save todoItem
function submitNewTask(e) {
    let listItem = createNewListItem()
    todolist.appendChild(listItem);
    console.log("submit new task");
}

function createNewListItem() {
    let listItem = modelItem.cloneNode(true);
    listItem.id = "";
    let task = listItem.querySelector(".task");
    task.innerText = newtask.value;
    return listItem;
}

function todolist_onclick(e) {
    e.preventDefault;

    let target = e.target;
    if (target.matches("input[type='submit']")) {
        if (target.value == "+") {
            todoItemMoveUp(e);
        } else if (target.value == "-") {
            todoItemMoveDown(e);
        } else if (target.value == "x") {
            todoItemDelete(e);
        }
    } else if (target.matches("a.task")) {
        toggleTask(e);
    }
}

function todoItemMoveUp(e) {
    // get child to be removed
    let child = e.target.parentElement;
    // get parent;
    let parent = child.parentElement;
    // get sibling of such child
    let sibling = child.previousElementSibling;
    if (sibling.id == "modelItem") {
        return;
    }

    // remove child
    parent.removeChild(child);
    // insert child after sibling
    parent.insertBefore(child, sibling);

    // TODO: record the previous, child, and next
}

function todoItemMoveDown(e) {
    // get child to be removed
    let child = e.target.parentElement;
    // get parent;
    let parent = child.parentElement;

    // get sibling of such child
    let sibling1 = child.nextElementSibling;
    let sibling2 = null;

    if (sibling1 == null) {
        // last item, exit
        return;
    } else {
        sibling2 = sibling1.nextElementSibling;
        if (sibling2 == null) {
            // swap last two items
            parent.removeChild(sibling1);
            parent.insertBefore(sibling1, child);
            return;
        }
    }

    // remove child
    parent.removeChild(child);
    // insert child after sibling
    parent.insertBefore(child, sibling2);

    // TODO: record the previous, child, and next
}

function todoItemDelete(e) {
    let parent = e.target.parentNode;
    let gp = parent.parentNode;
    gp.removeChild(parent);

    // TODO: record the previous, and next
}

function toggleTask(e) {
    let target = e.target;
    target.classList.toggle("done");

    // TODO: record the child
}

// purpose: encapsulate todo item information, and used to read from and write to localstorage.
class TodoItem {
    constructor(myID, nextID, task, duedate, urgency) {
        this.myID = myID;
        this.nextID = nextID;
        this.task = task;
        this.duedate = duedate;
        this.urgency = urgency;
    }

    // in: an instance of TodoItem
    // result: store in local storage
    writeTodoItemToLocalStorage(todoItem) {
        return null;
    }

    // out: an instance of TodoItem
    readTodoItemFromLocalStorage() {

        return todoItem;
    }
}
