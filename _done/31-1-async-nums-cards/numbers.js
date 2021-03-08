const axios = require('axios');

let url29 = "http://numbersapi.com/29/trivia?json";
let urlbatch = "http://numbersapi.com/100..103,205/trivia?json";
let url1 = "http://numbersapi.com/random?min=10&max=20&json";
let url2 = "http://numbersapi.com/random?min=10&max=20&json";
let url3 = "http://numbersapi.com/random?min=10&max=20&json";

axios
    .get(url29)
    .then(p1 => {
        console.log(`number ${p1.data.number}`);
        console.log(`trivia ${p1.data.text}`);

        return axios.get(urlbatch)
    })
    .then(p1 => {
        console.log(p1);
        for (const key in p1.data) {
            console.log(`${key} : ${p1.data[key]}`);
        }

        return axios.get(url1);
    })
    .then(p1 => {
        console.log(`first random number ${p1.data.number}`);
        console.log(`first random fact ${p1.data.text}`);

        return axios.get(url2);
    })
    .then(p1 => {
        console.log(`second random number ${p1.data.number}`);
        console.log(`second random fact ${p1.data.text}`);

        return axios.get(url3);
    })
    .then(p1 => {
        console.log(`third random number ${p1.data.number}`);
        console.log(`third random fact ${p1.data.text}`);
    })
    .catch(err => {
        console.log("there was a problem");
    })
