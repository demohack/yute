const fs = require('fs')

function cat (path) {

    fs.readFile(path, 'utf8' , (err, data) => {
        if (err) {
            console.error(err);
        } else {
            console.log(data)
        }
      })
      
    return
}

//cat ("c:/Users/yu/sb/yute/_doing/31-3-node-files/one.txt");

const argv = process.argv.slice(2);
console.log('argv: ', argv);

cat (argv[0]);
