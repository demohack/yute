const axios = require('axios');

async function startGame(deck_id_input) {
    try {
        let url_shuffle = "";

        if (typeof deck_id_input !== 'undefined') {
            url_shuffle = `https://deckofcardsapi.com/api/deck/${deck_id_input}/shuffle`;
        } else {
            url_shuffle = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
        }

        let p1 = await axios.get(url_shuffle);

        let url_deal = `https://deckofcardsapi.com/api/deck/${p1.data.deck_id}/draw/?count=1`;

        let p2 = await axios.get(url_deal);
        let p3 = await axios.get(url_deal);
        let p4 = await axios.get(url_deal);

        console.log(`${p2.data.cards[0].value} of ${p2.data.cards[0].suit}, ${p2.data.remaining} cards remaining`);
        console.log(`${p3.data.cards[0].value} of ${p3.data.cards[0].suit}, ${p3.data.remaining} cards remaining`);
        console.log(`${p4.data.cards[0].value} of ${p4.data.cards[0].suit}, ${p4.data.remaining} cards remaining`);

    } catch (e) {
        throw new Error(`there was a problem: ${e}`);
    }
}

startGame("faeeamvmksnr");
