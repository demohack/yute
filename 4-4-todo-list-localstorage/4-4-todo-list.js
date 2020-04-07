"use strict"
// PROJECT: TodoList
//
// implement a todo list with add, done, delete, save, restore
//
// additional functionality:
//      due date, urgency
//      allow user to reprioritize: move taks up and down

//
// on load, construct the UI, initialize the DOM events, load the app state, restore todo list if any
//
window.addEventListener("load", function (e) {
    console.log(`window.onLoad: start h: ${document.body.clientHeight} w: ${document.body.clientWidth}`)

    todoUI.init();
    todoList.init();

    console.log('window.onLoad: page is fully loaded');
});

class TodoUI {
    constructor() {
        //
        // UI global variables
        //
        this.controlBoard = null; // control board

        //
        // for new tasks
        //
        this.newTask = null;

        //
        // modelItem points to an LI that is used to clone new list items
        // because HTML is tricky and I'm a lazy coder
        //
        this.modelItem = null;
    }

    init() {
        this.controlBoard = document.querySelector("#controlboard");
        this.controlBoard.addEventListener("click", controlBoard_onClick);

        this.newTask = document.querySelector("#newtask");
        this.modelItem = document.querySelector("#modelItem"); // the first LI of the UL, invisible, used as a template
    }
}

let todoUI = new TodoUI();

function controlBoard_onClick(e) {
    e.preventDefault();
    let target = e.target;

    if (target.matches("#addTask")) {
        controlBoard_addTask(target);
    } else if (target.matches("#saveList")) {
        controlBoard_saveList(target);
    } else if (target.matches("#resetList")) {
        controlBoard_resetList(target);
    }
}

function controlBoard_saveList(target) {
    todoList.saveToLocalStorage();
}

function controlBoard_resetList(target) {
    let tries = 0;

    let recursive = function (todoItem) {
        if (tries > 20)
            return;

        if (todoItem == null) {
            return;
        } else {
            recursive(todoItem.nextItem);
            if (todoItem.element) {
                todoList.element.removeChild(todoItem.element);
            }
        }
    }

    recursive(todoList.firstItem);

    todoList.resetTodoList();
}

function controlBoard_addTask(target) {
    let task = todoUI.newTask.value;

    let todoItem = todoList.addTask(task);
    todoItem.element = createElement(todoItem);
    insertElement(todoItem.element);
}

function insertElement(child) {
    let sibling = todoList.element.children[1]; // skip modelItem, this.element.children[0]

    if (sibling != null) {
        todoList.element.insertBefore(child, sibling);
    } else {
        todoList.element.appendChild(child);
    }
}

function createElement(todoItem) {
    let listItemElement = todoUI.modelItem.cloneNode(true);
    listItemElement.id = todoItem.getKey();

    let taskElement = listItemElement.querySelector(".task");
    taskElement.innerText = todoItem.task;

    if (todoItem.done) {
        taskElement.classList.toggle("done");
    }

    return listItemElement;
}

class TodoList {
    constructor() {
        //
        // TodoList CLASS DATA
        //
        this.lastVisitedDate = null;
        this.firstItemID = null;
        this.nextItemID = null;

        this.firstItem = null; // pointer to the first todo item in linked list

    }

    init() {
        this.element = document.querySelector("#todoList");
        this.element.addEventListener("click", todoList_onClick);

        // check if this is the first time for the visitor
        this.restore();
        console.log(`initTodoList: repeat visit: ${this.lastVisitedDate}`);
    }

    store() {
        let date = new Date();
        this.lastVisitedDate = date.toString();
        localStorage.setItem('lastVisitedDate', this.lastVisitedDate);
        localStorage.setItem('firstItemID', this.firstItemID);
        localStorage.setItem('nextItemID', this.nextItemID);
    }

    restore() {
        this.lastVisitedDate = localStorage.getItem('lastVisitedDate');
        this.firstItemID = localStorage.getItem('firstItemID');
        this.nextItemID = localStorage.getItem('nextItemID');

        if (this.lastVisitedDate == null) {
            this.resetTodoList();
        } else {
            let date = new Date();
            this.lastVisitedDate = date.toString();
            this.restoreTodoList();
        }
    }

    findItemByKey(key) {
        let item = this.firstItem;

        while (item != null) {
            if (item.getKey() == key) {
                return item;
            }
            item = item.nextItem;
        }

        return item;
    }

    resetTodoList() {
        let date = new Date();

        this.lastVisitedDate = date.toString();
        this.firstItemID = null;
        this.nextItemID = 1;
        this.firstItem = null;

        this.store();
    }

    restoreTodoList() {
        if (this.firstItemID == null) {
            return;
        }

        let prevItem = null;
        let todoID = this.firstItemID;
        let todoItem = this.loadTodoItem(todoID);
        this.firstItem = todoItem;

        let i = 0;

        while (todoItem != null) {
            todoItem.element = createElement(todoItem);
            todoList.element.appendChild(todoItem.element);

            prevItem = todoItem;
            todoID = todoItem.nextItemID;
            todoItem = this.loadTodoItem(todoID);
            prevItem.nextItem = todoItem;

            if (i++ > 20)
                break;
        }
    }

    loadTodoItem(todoID) {
        let todoItem = new TodoItem();
        return todoItem.restore(todoID);
    }

    saveToLocalStorage() {
        let todoItem = this.firstItem;

        while (todoItem != null) {
            todoItem.store();
            todoItem = todoItem.nextItem;
        }

        todoList.store();
    }

    addTask(task) {
        let itemID = this.nextItemID++;

        let todoItem = new TodoItem();
        todoItem.init(itemID, task);

        todoItem.nextItem = this.firstItem; // works even on the first case, when firstItem is null
        todoItem.nextItemID = this.firstItemID;

        this.firstItem = todoItem;
        this.firstItemID = itemID;

        todoItem.store();
        this.store();

        return todoItem;
    }
}

let todoList = new TodoList();

function todoList_onClick(e) {
    e.preventDefault;
    let target = e.target;

    if (target.matches("input[type='submit']")) {
        if (target.value == "+") {
            todoList_moveItemUp(target);
        } else if (target.value == "-") {
            todoList_moveItemDown(target);
        } else if (target.value == "x") {
            todoList_deleteItem(target);
        }
    } else if (target.matches("a.task")) {
        todoList_toggleItem(target);
    }
}

function todoList_moveItemUp(target) {
    // get child to be removed, because we clicked on a button child within the LI
    let child = target.parentElement;
    // get parent, the UL of the LI
    let parent = child.parentElement;

    // get sibling of such child
    let sibling1 = child.previousElementSibling;
    if (sibling1.id == "modelItem") {
        // there's nothing to do: we're at the top of the list, as there's no prior sibling
        return;
    }
    let sibling0 = sibling1.previousElementSibling;
    let sibling2 = child.nextElementSibling;

    let sibling0Item = todoList.findItemByKey(sibling0.id);
    let sibling1Item = todoList.findItemByKey(sibling1.id);
    let childItem = todoList.findItemByKey(child.id);
    let sibling2Item = (sibling2 == null ? null : todoList.findItemByKey(sibling2.id));

    if (sibling0.id == "modelItem") {
        todoList.firstItem = childItem;
        todoList.firstItemID = childItem.myID;
        todoList.store();
    } else {
        sibling0Item.nextItem = childItem;
        sibling0Item.nextItemID = childItem.myID;
        sibling0Item.store();
    }

    childItem.nextItem = sibling1Item;
    childItem.nextItemID = (sibling1Item == null ? null : sibling1Item.myID);
    childItem.store();

    sibling1Item.nextItem = sibling2Item;
    sibling1Item.nextItemID = (sibling2Item == null ? null : sibling2Item.myID);
    sibling1Item.store();

    // remove child
    parent.removeChild(child);
    // insert child before sibling
    parent.insertBefore(child, sibling1);
}

function todoList_moveItemDown(target) {
    // get child to be removed, because we clicked on a button child within the LI
    let child = target.parentElement;
    // get parent, the UL of the LI
    let parent = child.parentElement;

    // get sibling of such child
    let sibling1 = child.previousElementSibling;
    let sibling2 = child.nextElementSibling;
    let sibling3 = (sibling2 == null ? null : sibling2.nextElementSibling);

    let sibling1Item = todoList.findItemByKey(sibling1.id);
    let childItem = todoList.findItemByKey(child.id);
    let sibling2Item = (sibling2 == null ? null : todoList.findItemByKey(sibling2.id));
    let sibling3Item = (sibling3 == null ? null : todoList.findItemByKey(sibling3.id));

    if (sibling2 == null) {
        return; // last item
    }

    if (sibling1.id == "modelItem") {
        todoList.firstItem = sibling2Item;
        todoList.firstItemID = sibling2Item.myID;
        todoList.store();
    } else {
        sibling1Item.nextItem = sibling2Item;
        sibling1Item.nextItemID = sibling2Item.myID;
        sibling1Item.store();
    }

    sibling2Item.nextItem = childItem;
    sibling2Item.nextItemID = childItem.myID;
    sibling2Item.store();

    childItem.nextItem = sibling3Item;
    childItem.nextItemID = (sibling3Item == null ? null : sibling3Item.myID);
    childItem.store();

    if (sibling3 == null) {
        // swap last two items
        parent.removeChild(sibling2);
        parent.insertBefore(sibling2, child);
        return;
    } else {
        parent.removeChild(child);
        parent.insertBefore(child, sibling3);
    }
}

function todoList_deleteItem(target) {
    // get child to be removed, because we clicked on a button child within the LI
    let child = target.parentElement;
    // get parent, the UL of the LI
    let parent = child.parentElement;

    // get sibling of such child
    let sibling1 = child.previousElementSibling;
    let sibling2 = child.nextElementSibling;

    let sibling1Item = todoList.findItemByKey(sibling1.id);
    let childItem = todoList.findItemByKey(child.id);
    let sibling2Item = (sibling2 == null ? null : todoList.findItemByKey(sibling2.id));
    let sibling2ItemID = (sibling2Item == null ? null : sibling2Item.myID);

    if (sibling1.id == "modelItem") {
        todoList.firstItem = sibling2Item;
        todoList.firstItemID = sibling2ItemID;
        todoList.store();
    } else {
        sibling1Item.nextItem = sibling2Item;
        sibling1Item.nextItemID = sibling2ItemID;
        sibling1Item.store();
    }

    childItem.remove();
    parent.removeChild(child);
}

function todoList_toggleItem(target) {
    target.classList.toggle("done");
    let child = target.parentNode;

    // TODO: record the child
    let childItem = todoList.findItemByKey(child.id);
    childItem.done = target.classList.contains("done");
    childItem.store();
}

// purpose: encapsulate todo item information, and used to read from and write to localstorage.
class TodoItem {
    constructor() {
        this.myID = null; // long integer value of this ID
        this.nextItemID = null; // long integer value of the next ID in a linked list
        this.task = null; // string description of task
        this.done = null; // boolean is task done?
        this.element = null; // object reference to be assigned the HTML element li

        // *** might as well implement linked list since we're keeping tracking of nextID ***
        this.nextItem = null; // pointer to the next todo item
    }

    init(myID, task) {
        this.myID = myID; // long integer value of this ID
        this.task = task; // string description of task
    }

    getKey() {
        return `taskID-${this.myID}`;
    }

    remove() {
        let key = this.getKey();
        localStorage.removeItem(key);
        return;
    }

    store() {
        let key = this.getKey();

        let tmpItem = this.nextItem;
        let tmpElement = this.element;

        this.nextItem = null;
        this.element = null;

        let s = JSON.stringify(this);

        this.nextItem = tmpItem;
        this.element = tmpElement;

        localStorage.setItem(key, s);
        return;
    }

    restore(id) {
        this.myID = id;
        let s = localStorage.getItem(this.getKey());

        if (s == null) {
            return;
        }

        let temp = JSON.parse(s);

        this.nextItemID = temp.nextItemID;
        this.task = temp.task;
        this.done = temp.done;

        return this;
    }
}
