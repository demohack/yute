const axios = require('axios');

let url29 = "http://numbersapi.com/29/trivia?json";

let urlbatch = "http://numbersapi.com/100..103,205/trivia?json";

let url1 = "http://numbersapi.com/29/trivia?json";
let url2 = "http://numbersapi.com/29/trivia?json";
let url3 = "http://numbersapi.com/29/trivia?json";
let url4 = "http://numbersapi.com/29/trivia?json";

let urlrandom = "http://numbersapi.com/random?min=10&max=20&json";

async function getNumbers() {
    try {

        let p29 = await axios.get(url29);
        console.log(`random fact on ${p29.data.number}: ${p29.data.text}`);

        let pbatch = await axios.get(urlbatch);
        console.log(`multiple numbers on single request: ${urlbatch}`);
        for (const key in pbatch.data) {
            console.log(`${key} : ${pbatch.data[key]}`);
        }

        let p1 = await axios.get(url1);
        let p2 = await axios.get(url2);
        let p3 = await axios.get(url3);
        let p4 = await axios.get(url4);

        console.log(`first random fact on ${p1.data.number}: ${p1.data.text}`);
        console.log(`second random fact on ${p2.data.number}: ${p2.data.text}`);
        console.log(`third random fact on ${p3.data.number}: ${p3.data.text}`);
        console.log(`fourth random fact on ${p4.data.number}: ${p4.data.text}`);

        let prandom = await axios.get(urlrandom);
        console.log(`random fact on random # ${prandom.data.number}: ${prandom.data.text}`);

    } catch {
        console.log("there was a problem");
    }
}

getNumbers();
