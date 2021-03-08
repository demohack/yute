$("#btn-deal").on("click", function () {
    console.log("#btn-deal clicked");

    let url_draw = `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`;
    axios
    .get(url_draw)
    .then(p1 => {
        const {success, cards, deck_id, remaining} = p1.data;
        console.log([success, cards, deck_id, remaining]);

        console.log(`${cards[0].value} of ${cards[0].suit}`);

        let image = new Image();
        image.src = cards[0].images.png;
        $('#dropspot').prepend(image);
    })
    .catch(err => {
        console.log("there was a problem");
    })

});

let success = false;
let deck_id = "faeeamvmksnr";
let shuffled = false;
let remaining = 0;
let cards = [];

let url_shuffle = `https://deckofcardsapi.com/api/deck/${deck_id}/shuffle`;
