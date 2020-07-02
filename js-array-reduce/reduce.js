/*
Write a function called extractValue which accepts an array of objects and a key 
and returns a new array with the value of each object at the key.
*/
// const arr = [{
//     name: 'Elie'
// }, {
//     name: 'Tim'
// }, {
//     name: 'Matt'
// }, {
//     name: 'Colt'
// }];

function extractValue(arr, key) {
    let cf = function (accumulator, currentValue) {
        let count = accumulator.length;
        if (currentValue.hasOwnProperty(key)) {
            accumulator[count] = currentValue[key];
        }
        return accumulator;
    }
    const iv = []; // initial value, could be scalar or other data structure

    let a = arr.reduce(cf, iv);

    return a;
}

// extractValue(arr, 'name'); // ['Elie', 'Tim', 'Matt', 'Colt']

/*
Write a function called vowelCount which accepts a string and returns an object with the keys as the vowel and
the values as the number of times the vowel appears in the string.
This function should be case insensitive so a lowercase letter and uppercase letter should count
*/

function vowelCount(str) {
    let re = /[aeiou]/;
    let cf = function (accumulator, currentValue) {
        if (re.test(currentValue)) {
            let v = accumulator[currentValue];
            accumulator[currentValue] = typeof v === 'undefined' ? 1 : v + 1;
        }
        return accumulator;
    }
    const iv = {};

    let a = str.toLowerCase().split('');
    let r = a.reduce(cf, iv);

    return r;
}

// vowelCount('Elie'); // {e:2,i:1};
// vowelCount('Tim'); // {i:1};
// vowelCount('Matt'); // {a:1})
// vowelCount('hmmm'); // {};
// vowelCount('I Am awesome and so are you'); // {i: 1, a: 4, e: 3, o: 3, u: 1};

/*
Write a function called addKeyAndValue which accepts an array of objects and returns the array of objects passed to it with each object now including the key and value passed to the function.

Examples:
[{
    title: 'Instructor',
    name: 'Elie'
}, {
    title: 'Instructor',
    name: 'Tim'
}, {
    title: 'Instructor',
    name: 'Matt'
}, {
    title: 'Instructor',
    name: 'Colt'
}]

*/

// const arr = [{
//     name: 'Elie'
// }, {
//     name: 'Tim'
// }, {
//     name: 'Matt'
// }, {
//     name: 'Colt'
// }];

function addKeyAndValue(arr, key, value) {
    let cf = function (accumulator, currentValue) {
        let count = accumulator.length;
        currentValue[key] = value;
        accumulator[count] = currentValue;
        return accumulator;
    }
    const iv = [];

    let r = arr.reduce(cf, iv);

    return r;
}

// addKeyAndValue(arr, 'title', 'Instructor');

/*
Write a function called partition which accepts an array and a callback and
returns an array with two arrays inside of it. The partition function should
run the callback function on each value in the array and if the result of the
callback function at that specific value is true, the value should be placed
in the first subarray. If the result of the callback function at that specific
value is false, the value should be placed in the second subarray.

*/

function partition(arr, callback) {
    let cf = function (accumulator, currentValue) {
        let c0 = accumulator[0].length;
        let c1 = accumulator[1].length;

        if (callback(currentValue)) {
            accumulator[0][c0] = currentValue;
        } else {
            accumulator[1][c1] = currentValue;
        }
        return accumulator;
    }
    const iv = [[],[]];
    let r = arr.reduce(cf, iv);

    return r;
}

function isEven(val){
    return val % 2 === 0;
}

// const arr = [1,2,3,4,5,6,7,8];

// partition(arr, isEven); // [[2,4,6,8], [1,3,5,7]];

function isLongerThanThreeCharacters(val){
    return val.length > 3;
}

// const names = ['Elie', 'Colt', 'Tim', 'Matt']; // [['Elie', 'Colt', 'Matt'], ['Tim']]
// partition(names, isLongerThanThreeCharacters);
