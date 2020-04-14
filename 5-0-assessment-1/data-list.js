"use strict"
evt = "card-list.js:begin";
console.log(`${evt}: ${new Date}`);

class DataList {
    constructor() {
        //
        // DataList CLASS DATA
        //
        this.lastVisitedDate = null; // the last visited date -- this belongs in app-UI
        this.firstItemID = null; // id of first item in linked list
        this.nextItemID = null; // id of next

        this.firstItem = null; // pointer to the first item in linked list

        this.selectedItems = 0; // integer of selected items
        this.countOfItems = 0;  // integer of total count of items in list

        this.cursor = null; // todo: for the iterator protocol
    }

    // todo: iterator protocol
    next() {
        let nextCursor = this.cursor;
        this.cursor = (nextCursor == null ? null : nextCursor.nextItem);
        return nextCursor
    }

    [Symbol.iterator]() {
        return this;
    }

    init() {
        this.element = document.querySelector("#game");

        // check if this is the first time for the visitor
        this.restore();
        console.log(`DataList.init(): repeat visit: ${this.lastVisitedDate}`);
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
            this.resetDataList();
        } else {
            let date = new Date();
            this.lastVisitedDate = date.toString();
            this.restoreDataList();
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

    resetDataList() {
        let date = new Date();

        this.lastVisitedDate = date.toString();
        this.firstItemID = null;
        this.nextItemID = 1;
        this.firstItem = null;
        this.selectedItems = 0;
        this.countOfItems = 0;

        this.store();
    }

    restoreDataList() {
        if (this.firstItemID == null) {
            return;
        }

        let prevItem = null;
        let dataID = this.firstItemID;
        let dataItem = this.loadDataItem(dataID);
        this.firstItem = dataItem;

        let i = 10000; // safeguard against runaway loops

        while (dataItem != null) {
            // todo:
            // dataItem.element = createElement(dataItem);
            // dataList.element.appendChild(dataItem.element);

            prevItem = dataItem;
            dataID = dataItem.nextItemID;
            dataItem = this.loadDataItem(dataID);
            prevItem.nextItem = dataItem;
            this.countOfItems++;

            if (i++ > 20)
                break;
        }
    }

    loadDataItem(cardID) {
        let dataItem = new DataItem();
        return dataItem.restore(cardID);
    }

    saveToLocalStorage() {
        let dataItem = this.firstItem;

        while (dataItem != null) {
            dataItem.store();
            dataItem = dataItem.nextItem;
        }

        dataList.store();
    }

    addCard(color, face) {
        let itemID = this.nextItemID++;

        let dataItem = new DataItem();
        dataItem.init(itemID, color, face);

        dataItem.nextItem = this.firstItem; // works even on the first case, when firstItem is null
        dataItem.nextItemID = this.firstItemID;

        this.firstItem = dataItem;
        this.firstItemID = itemID;

        dataItem.store();
        this.store();

        this.countOfItems++;

        return dataItem;
    }
}

let dataList = new DataList();