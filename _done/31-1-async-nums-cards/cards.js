const axios = require('axios');

let success = false;
let deck_id = "faeeamvmksnr";
let shuffled = false;
let remaining = 0;
let cards = [];

// let url_shuffle = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";

let url_shuffle = `https://deckofcardsapi.com/api/deck/${deck_id}/shuffle`;

axios
    .get(url_shuffle)
    .then(p1 => {
        const {success, deck_id, shuffled, remaining} = p1.data;
        console.log(`shuffled cards for deck ${deck_id}`);
        // console.log([success, deck_id, shuffled, remaining]);

        if (success) {
            let url_draw = `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`;
            return axios.get(url_draw)
        }
    })
    .then(p1 => {
        const {success, cards, deck_id, remaining} = p1.data;
        // console.log([success, cards, deck_id, remaining]);

        console.log(`${cards[0].value} of ${cards[0].suit}`);

        if (success) {
            console.log(`shuffled cards for deck ${deck_id}`);
            let url_draw = `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`;
            return axios.get(url_draw)
        }
    })
    .then(p1 => {
        const {success, cards, deck_id, remaining} = p1.data;
        // console.log([success, cards, deck_id, remaining]);

        console.log(`${cards[0].value} of ${cards[0].suit}`);
    })
    .catch(err => {
        console.log("there was a problem");
    })
