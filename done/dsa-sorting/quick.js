/*
pivot accepts an array, starting index, and ending index
You can assume the pivot is always the first element

The pivot function is responsible for taking an array,
setting the pivot value, and mutating the array so that
all values less than the pivot wind up to the left of it,
and all values greater than the pivot wind up to the right
of it.

*/

function _swap(arr, left, right) {
    let t = arr[left];
    arr[left] = arr[right];
    arr[right] = t;
}

function pivot(arr, left = 0, right = arr.length - 1) {

    // assume the pivot is first element
    let pv = arr[left];
    let p = left;

    let jv;
    let j;

    for (j = left + 1; j <= right; j++) {
        jv = arr[j];
        if (pv > jv) {
            p++;
            // on first iteration, p == j, and so there's no swap; save to end
            if (p != j) _swap(arr, p, j);
        }
    }

    // final swap because the pivot value is still at the original left position
    _swap(arr, left, p);
    return p;
}

function _quickSort(arr, left, right) {
    if (left < right) {
        let pivot_idx = pivot(arr, left, right);
        _quickSort(arr, left, pivot_idx - 1);
        _quickSort(arr, pivot_idx + 1, right);
    }
    return arr;
}

/*
quickSort accepts an array, left index, and right index

goals
- does not mutate the original array input
- returns new sorted array
*/

function quickSort(arr, left = 0, right = arr.length - 1) {
    return _quickSort(arr.slice(0, arr.length), left, right);
}

module.exports = {
    pivot,
    quickSort
};

// var a = [5, 4, 9, 10, 2, 20, 8, 7, 3];
// var b = [8, 4, 2, 5, 0, 10, 11, 12, 13, 16];
// quickSort(a);
// quickSort(b);