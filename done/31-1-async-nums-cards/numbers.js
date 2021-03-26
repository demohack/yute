const axios = require('axios');

let url29 = "http://numbersapi.com/29/trivia?json";

let urlbatch = "http://numbersapi.com/100..103,205/trivia?json";

let url1 = "http://numbersapi.com/29/trivia?json";
let url2 = "http://numbersapi.com/29/trivia?json";
let url3 = "http://numbersapi.com/29/trivia?json";
let url4 = "http://numbersapi.com/29/trivia?json";

let urlrandom = "http://numbersapi.com/random?min=10&max=20&json";

axios
    .get(url29)
    .then(p29 => {
        console.log(`random fact on ${p29.data.number}: ${p29.data.text}`);

        return axios.get(urlbatch)
    })
    .then(pbatch => {
        console.log(`multiple numbers on single request: ${urlbatch}`);
        for (const key in pbatch.data) {
            console.log(`${key} : ${pbatch.data[key]}`);
        }

        return axios.get(url1);
    })
    .then(p1 => {
        console.log(`first random fact on ${p1.data.number}: ${p1.data.text}`);

        return axios.get(url2);
    })
    .then(p1 => {
        console.log(`second random fact on ${p1.data.number}: ${p1.data.text}`);

        return axios.get(url3);
    })
    .then(p1 => {
        console.log(`third random fact on ${p1.data.number}: ${p1.data.text}`);

        return axios.get(url4);
    })
    .then(p1 => {
        console.log(`fourth random fact on ${p1.data.number}: ${p1.data.text}`);

        return axios.get(urlrandom);
    })
    .then(prandom => {
        console.log(`random fact on random # ${prandom.data.number}: ${prandom.data.text}`);
    })
        .catch(err => {
        console.log("there was a problem");
    })
