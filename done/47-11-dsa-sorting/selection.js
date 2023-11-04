function selectionSort(arr) {
    for (let i = 0; i < arr.length; i++) {

        let min_index = i;

        for (let j = min_index + 1; j < arr.length; j++) {
            if (arr[j] < arr[min_index]) {
                min_index = j
            }
        }

        if (i != min_index) {
            let t = arr[min_index];
            arr[min_index] = arr[i];
            arr[i] = t;
        }
    }

    return arr;
}

// module.exports = selectionSort;

a = [4, 20, 12, 10, 7, 9];
r = [4, 7, 9, 10, 12, 20];
m = selectionSort(a);
v = JSON.stringify(r) === JSON.stringify(m);
console.log(`selectionSort(${a}) = ${m} : ${v}, expected ${r}`);

a = [0, -10, 7, 4];
r = [-10, 0, 4, 7];
m = selectionSort(a);
v = JSON.stringify(r) === JSON.stringify(m);
console.log(`selectionSort(${a}) = ${m} : ${v}, expected ${r}`);

a = [1, 2, 3];
r = [1, 2, 3];
m = selectionSort(a);
v = JSON.stringify(r) === JSON.stringify(m);
console.log(`selectionSort(${a}) = ${m} : ${v}, expected ${r}`);

a = [];
r = [];
m = selectionSort(a);
v = JSON.stringify(r) === JSON.stringify(m);
console.log(`selectionSort(${a}) = ${m} : ${v}, expected ${r}`);

