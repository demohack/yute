const API_KEY = 'Jya0wdOZuAGSEH4yvOSq5g9798KQLThd';
const DATA_LIMIT = 1;
const API_ENDPOINT = "https://api.giphy.com/v1/gifs/search";
console.log("Let's get this party started!");

function insertImage(url) {
    let $box = $("#picture-space");
    let t = `<div class="mb-3 pics animation all"><img src="${url}" class="img-fluid"></div>`;
    $box.append($(t));
}

async function searchCick() {
    let userInput = $("#user-input").val();
    let response = await axios.get(
        API_ENDPOINT, {
            params: {
                q: userInput,
                api_key: API_KEY,
                limit: DATA_LIMIT
            }
        });

    console.log("getImage response=", response);
    insertImage(response.data.data[0].images.downsized_large.url);
}

function removeClick() {
    let $box = $("#picture-space");
    $box.empty();
}
$("#user-input").on("keypress", function(e){
    if (e.which == 13) {
        searchCick();
    }
});
$("#search-btn").on("click", searchCick);
$("#remove-btn").on("click", removeClick);