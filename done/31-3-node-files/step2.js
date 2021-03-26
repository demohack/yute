const fs = require('fs')
const axios = require('axios');

function cat(path) {

    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error(err)
        } else {
            console.log(data)
        }
    })

    return
}

function webCat(path) {
    axios.get(path)
        .then(function (response) {
            // handle success
            console.log(response);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });

    return
}

//webCat ("http://google.com")

const argv = process.argv.slice(2);
console.log('argv: ', argv);

const path = argv[0];
if (path.substr(0,4) == "http") {
    webCat(path);
} else {
    cat(path);
}
