const fs = require('fs');
const util = require('util');

// Convert fs.readFile into Promise version of same    
const readFile = util.promisify(fs.readFile);

function getStuff() {
  return readFile('test');
}

// Can't use `await` outside of an async function so you need to chain
// with then()
getStuff().then(data => {
  console.log(data.toString());
})
