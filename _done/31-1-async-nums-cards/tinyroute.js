const { response } = require('express');
const express = require('express');

const app = express();

app.get('/dogs', (req, res) => {
    console.log("bark bark");
    return res.send("Dogs go to the park");
});

app.get('/cats', (req, res) => {
    console.log("bark bark");
    return res.send("Meow meow meow");
});

app.listen(3000, function () {
    console.log('App on port 3000');
});

