const fs_in = require('fs')
const fs_out = require('fs')
const axios = require('axios');
const process = require('process');

let output_file = "";

function output(msg) {
    // console.log(">> output << ");
    if (output_file == "") {
        console.log(msg);
    } else {
        fs_out.writeFile(output_file, msg, (err, data) => {
            if (err) {
                console.err(err);
                process.exit(1);
            }
        })
    }
}

function cat(path) {

    fs_in.readFile(path, 'utf8', (err, data) => {
        if (err) {
            output(err);
            process.exit(1);
        } else {
            output(path);
        }
    })

    return
}

function webCat(path) {
    axios.get(path)
        .then(function (response) {
            // handle success
            output(response.data);
        })
        .catch(function (error) {
            // handle error
            output(error.message);
            process.exit(1);
        })
        .then(function () {
            // always executed
        });

    return
}

const argv = process.argv.slice(2);
//console.log('argv: ', process.argv);

let path = "";

if (argv[0] == "--out") {
    output_file = argv[1];
    path = argv[2];
} else {
    path = argv[0];
}

if (path.substr(0, 4) == "http") {
    webCat(path);
} else {
    cat(path);
}
