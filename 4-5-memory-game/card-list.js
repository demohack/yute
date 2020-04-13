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

        this.lastSelectedItemID = null; // pointer to the last selected card
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
        localStorage.setItem('lastSelectedItemID', this.lastSelectedItemID);
    }

    restore() {
        this.lastVisitedDate = localStorage.getItem('lastVisitedDate');
        this.firstItemID = localStorage.getItem('firstItemID');
        this.nextItemID = localStorage.getItem('nextItemID');

        this.lastSelectedItemID = localStorage.getItem('lastSelectedItemID');
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

        let loopCount = 0; // safeguard against runaway loops in circular linked lists
        let loopMax = 1000;

        while (item != null) {
            if (item.getKey() == key) {
                return item;
            }

            item = item.nextItem;

            if (loopCount++ > loopMax)
                break;
        }

        return item;
    }

    resetCardList() {
        let date = new Date();

        this.lastVisitedDate = date.toString();
        this.firstItemID = null;
        this.nextItemID = 1;
        this.firstItem = null;
        this.lastSelectedItemID = null;
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

        let loopCount = 0; // safeguard against runaway loops in circular linked lists
        let loopMax = 1000;

        while (cardItem != null) {
            prevItem = cardItem;
            cardID = cardItem.nextItemID;
            cardItem = this.loadCardItem(cardID);
            prevItem.nextItem = cardItem;
            this.countOfItems++;

            if (loopCount++ > loopMax)
                break;
        }
    }

    loadCardItem(cardID) {
        let cardItem = new CardItem();
        return cardItem.restore(cardID);
    }

    saveToLocalStorage() {
        let cardItem = this.firstItem;

        let loopCount = 0; // safeguard against runaway loops in circular linked lists
        let loopMax = 1000;

        while (cardItem != null) {
            cardItem.store();
            cardItem = cardItem.nextItem;

            if (loopCount++ > loopMax)
                break;
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