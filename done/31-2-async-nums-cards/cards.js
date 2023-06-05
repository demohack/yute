const axios = require('axios');

function startGame(deck_id_input) {
    try {
        let url_shuffle = "";

        if (typeof deck_id_input !== 'undefined') {
            url_shuffle = `https://deckofcardsapi.com/api/deck/${deck_id_input}/shuffle`;
        } else {
            url_shuffle = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
        }

        axios
            .get(url_shuffle)
            .then(p1 => {
                const {
                    success,
                    deck_id,
                    shuffled,
                    remaining
                } = p1.data;

                if (success) {
                    console.log(`shuffled cards for deck ${deck_id}`);

                    let url_draw = `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`;
                    return axios.get(url_draw)
                } else {
                    throw new Error("failed to shuffle cards");
                }
            })
            .then(p1 => {
                const {
                    success,
                    cards,
                    deck_id,
                    remaining
                } = p1.data;

                if (success) {
                    console.log(`${cards[0].value} of ${cards[0].suit}`);

                    let url_draw = `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`;
                    return axios.get(url_draw)
                } else {
                    throw new Error("failed to deal cards");
                }
            })
            .then(p1 => {
                const {
                    success,
                    cards,
                    deck_id,
                    remaining
                } = p1.data;

                if (success) {
                    console.log(`${cards[0].value} of ${cards[0].suit}`);
                } else {
                    throw new Error("failed to deal cards");
                }
            })
            .catch(e => {
                throw new Error(`there was a problem: ${e}`);
            })

    } catch (e) {
        throw new Error(`there was a problem: ${e}`);
    }
}

let deck_id = "faeeamvmksnr";
startGame(deck_id);