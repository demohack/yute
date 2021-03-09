$("#btn-deal").on("click", async function () {
    console.log("#btn-deal clicked");

    const url_shuffle = `https://deckofcardsapi.com/api/deck/${deck_id}/shuffle`;
    let p1 = await axios.get(url_shuffle);

    const url_deal = `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`;
    p1 = await axios.get(url_deal);
    console.log(`${p1.data.cards[0].value} of ${p1.data.cards[0].suit}, ${p1.data.remaining} cards remaining`);

    let image = new Image();
    image.src = p1.data.cards[0].images.png;
    $('#dropspot').prepend(image);

});

let deck_id = "faeeamvmksnr";

