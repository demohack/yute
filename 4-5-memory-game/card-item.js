"use strict"
evt = "card-item.js:begin";
console.log(`${evt}: ${new Date}`);

class CardItem {
    constructor() {
        this.myID = null; // long integer value of this ID

        this.nextItemID = null; // long integer value of the next ID in a linked list
        this.nextItem = null; // pointer to the next card in linked list

        this.element = null; // object reference to be assigned this card's HTML element

        this.color = null; // string color of card
        this.face = null; // string face value of card, {Ace, 2, 3, 4, 5, 6, 7, 8, 9, 10, Jack, Queen, King, Joker}

        this.dealt = null; // boolean has card been dealt?
        this.selected = null; // boolean has card been selected?

        // iterator protocol requirement
        this.value = null;
    }

    // todo: iterator protocol
    done(boolean) {

    }

    init(myID, color, face) {
        this.myID = myID;
        this.face = face;
        this.color = color;
    }

    getKey() {
        return `cardID-${this.myID}`;
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
        this.face = temp.face;
        this.color = temp.color;
        this.dealt = temp.dealt;
        this.selected = temp.selected;

        return this;
    }
}
