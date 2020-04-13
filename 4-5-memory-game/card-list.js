"use strict"
evt = "card-list.js:begin";
console.log(`${evt}: ${new Date}`);

class CardList {
    constructor() {
        //
        // CardList CLASS DATA
        //
        this.lastVisitedDate = null;
        this.firstItemID = null;
        this.nextItemID = null;

        this.firstItem = null; // pointer to the first card item in linked list
        this.lastSelectedItem = null; // pointer to the last selected card
        this.selectedItems = 0;
        this.countOfItems = 0;

        // todo: iterator protocol
        this.cursor = null;
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
        console.log(`CardList.init(): repeat visit: ${this.lastVisitedDate}`);
    }

    store() {
        let date = new Date();
        this.lastVisitedDate = date.toString();
        localStorage.setItem('lastVisitedDate', this.lastVisitedDate);
        localStorage.setItem('firstItemID', this.firstItemID);
        localStorage.setItem('nextItemID', this.nextItemID);
        localStorage.setItem('lastSelectedItem', this.lastSelectedItem);
    }

    restore() {
        this.lastVisitedDate = localStorage.getItem('lastVisitedDate');
        this.firstItemID = localStorage.getItem('firstItemID');
        this.nextItemID = localStorage.getItem('nextItemID');

        let tmpitem = localStorage.getItem('lastSelectedItem');
        this.lastSelectedItem = (tmpitem == "null" ? null : tmpitem);

        if (this.lastVisitedDate == null) {
            this.resetCardList();
        } else {
            let date = new Date();
            this.lastVisitedDate = date.toString();
            this.restoreCardList();
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

    resetCardList() {
        let date = new Date();

        this.lastVisitedDate = date.toString();
        this.firstItemID = null;
        this.nextItemID = 1;
        this.firstItem = null;
        this.lastSelectedItem = null;
        this.selectedItems = 0;
        this.countOfItems = 0;

        this.store();
    }

    restoreCardList() {
        if (this.firstItemID == null) {
            return;
        }

        let prevItem = null;
        let cardID = this.firstItemID;
        let cardItem = this.loadCardItem(cardID);
        this.firstItem = cardItem;

        let i = 10000; // safeguard against runaway loops

        while (cardItem != null) {
            // todo:
            // cardItem.element = createElement(cardItem);
            // cardList.element.appendChild(cardItem.element);

            prevItem = cardItem;
            cardID = cardItem.nextItemID;
            cardItem = this.loadCardItem(cardID);
            prevItem.nextItem = cardItem;
            this.countOfItems++;

            if (i++ > 20)
                break;
        }
    }

    loadCardItem(cardID) {
        let cardItem = new CardItem();
        return cardItem.restore(cardID);
    }

    saveToLocalStorage() {
        let cardItem = this.firstItem;

        while (cardItem != null) {
            cardItem.store();
            cardItem = cardItem.nextItem;
        }

        cardList.store();
    }

    addCard(color, face) {
        let itemID = this.nextItemID++;

        let cardItem = new CardItem();
        cardItem.init(itemID, color, face);

        cardItem.nextItem = this.firstItem; // works even on the first case, when firstItem is null
        cardItem.nextItemID = this.firstItemID;

        this.firstItem = cardItem;
        this.firstItemID = itemID;

        cardItem.store();
        this.store();

        this.countOfItems++;

        return cardItem;
    }
}

let cardList = new CardList();