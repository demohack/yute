/** Command-line tool to generate Markov text. */

const fs = require('fs');
const axios = require('axios');
const markov = require("./markov");

function readFile(fileName) {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, 'utf8', (error, data) => {
            if (error) return reject(error);

            resolve(data);
        })
    });
}


async function text_from_file(path) {
    let retval = "";

    const data = await readFile(path)
        .then(data => {
            retval = data;
        })
        .catch(error => {
            console.error(`Unable to read file ${path}: ${err}`);
        });

    return retval;
}

async function text_from_url(url) {
    let retval = null;

    await axios.get(url)
        .then(function (response) {
            // handle success
            retval = response.data;
        })
        .catch(function (error) {
            // handle error
            console.log(error.message);
        });

    return retval;
}


async function run_me() {
    const argv = process.argv.slice(2);

    let path_type = argv[0];
    let path = argv[1];
    let text = "";

    // http://www.gutenberg.org/files/11/11-0.txt
    // /home/yu/sb/yute/_doing/31-4-node-markov
    // C:\Users\yu\sb\yute\_doing\31-4-node-markov\eggs.txt
    // console.log("dirname: " + __dirname);

    // console.log(`path_type: ${path_type}, path: ${path}`)
    if (path_type == "file") {
        text = await text_from_file(path);
    } else if (path_type == "url") {
        text = await text_from_url(path);
    }

    if (text != "") {
        const m = new markov.MarkovMachine(text);
        console.log(m.makeText());
    } else {
        console.log("no makeText, empty file");
    }
}

run_me();