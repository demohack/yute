function merge(left_arr, right_arr) {
    let m = [];
    let j = 0,
        k = 0;
    let jv, kv;
    let jz = left_arr.length;
    let kz = right_arr.length;
    let iz = jz + kz;
    for (let i = 0; i < iz; i++) {
        if (j < jz && k < kz) {
            jv = left_arr[j];
            kv = right_arr[k];
            if (jv < kv) {
                m.push(jv);
                j++;
            } else if (jv > kv) {
                m.push(kv);
                k++;
            } else {
                m.push(jv);
                m.push(kv);
                j++;
                k++;
            }
        } else if (j < jz) {
            jv = left_arr[j];
            m.push(jv);
            j++;
        } else if (k < kz) {
            kv = right_arr[k];
            m.push(kv);
            k++;
        }
    }

    return m;
}

function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    let _merge_sort = (arr, leftIdx = 0, rightIdx = arr.length - 1) => {
        if (leftIdx == rightIdx) {
            return [arr[leftIdx]];
        }

        let middleIdx = Math.floor((leftIdx + rightIdx) / 2);
        let left_arr = [],
            right_arr = [];

        if (leftIdx <= middleIdx) {
            left_arr = _merge_sort(arr, leftIdx, middleIdx);
            console.log(arr.slice(leftIdx, middleIdx));
        }

        if (middleIdx + 1 <= arr.length - 1) {
            right_arr = _merge_sort(arr, middleIdx + 1, rightIdx);
            console.log(arr.slice(middleIdx + 1, rightIdx));
        }

        return merge(left_arr, right_arr);
    }

    return _merge_sort(arr);
}

module.exports = {
    merge,
    mergeSort
};

// let a, b, m, r, v;

// a = [1, 3, 4, 5];
// b = [2, 4, 6, 8];
// r = [1, 2, 3, 4, 4, 5, 6, 8];
// m = merge(a, b);
// v = JSON.stringify(r) === JSON.stringify(m);
// console.log(`merge(${a},${b}) = ${m} : ${v}, expected ${r}`);

// a = [-2, -1, 0, 4, 5, 6];
// b = [-3, -2, -1, 2, 3, 5, 7, 8];
// r = [-3, -2, -2, -1, -1, 0, 2, 3, 4, 5, 5, 6, 7, 8];
// m = merge(a, b);
// v = JSON.stringify(r) === JSON.stringify(m);
// console.log(`merge(${a},${b}) = ${m} : ${v}, expected ${r}`);

// a = [3, 4, 5];
// b = [1, 2];
// r = [1, 2, 3, 4, 5];
// m = merge(a, b);
// v = JSON.stringify(r) === JSON.stringify(m);
// console.log(`merge(${a},${b}) = ${m} : ${v}, expected ${r}`);

// a = [4, 20, 12, 10, 7, 9];
// r = [4, 7, 9, 10, 12, 20];
// m = mergeSort(a);
// v = JSON.stringify(r) === JSON.stringify(m);
// console.log(`mergeSort(${a}) = ${m} : ${v}, expected ${r}`);

// a = [0, -10, 7, 4];
// r = [-10, 0, 4, 7];
// m = mergeSort(a);
// v = JSON.stringify(r) === JSON.stringify(m);
// console.log(`mergeSort(${a}) = ${m} : ${v}, expected ${r}`);

// a = [1, 2, 3];
// r = [1, 2, 3];
// m = mergeSort(a);
// v = JSON.stringify(r) === JSON.stringify(m);
// console.log(`mergeSort(${a}) = ${m} : ${v}, expected ${r}`);

// a = [];
// r = [];
// m = mergeSort(a);
// v = JSON.stringify(r) === JSON.stringify(m);
// console.log(`mergeSort(${a}) = ${m} : ${v}, expected ${r}`);

// a = [4, 3, 5, 3, 43, 232, 4, 34, 232, 32, 4, 35, 34, 23, 2, 453, 546, 75, 67, 4342, 32];
// r = [2, 3, 3, 4, 4, 4, 5, 23, 32, 32, 34, 34, 35, 43, 67, 75, 232, 232, 453, 546, 4342];
// m = mergeSort(a);
// v = JSON.stringify(r) === JSON.stringify(m);
// console.log(`mergeSort(${a}) = ${m} : ${v}, expected ${r}`);