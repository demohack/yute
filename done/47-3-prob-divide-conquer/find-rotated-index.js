function findRotatedIndex(arr, val) {
    if (arr.length == 1) {
        if (val == arr[0])
            return 0;
        else
            return -1;
    } else if (arr.length == 2) {
        if (val == arr[0])
            return 0;
        else if (val == arr[1])
            return 1;
        else
            return -1;
    }

    let pivotIdx = binarySearchPivotPoint(arr);

    if (val >= arr[0] && val <= arr[pivotIdx-1])
        return binarySearch(arr, leftIdx = 0, rightIdx = pivotIdx - 1, val);

    return binarySearch(arr, leftIdx = pivotIdx, rightIdx = arr.length - 1, val);
}

function binarySearchPivotPoint(arr) {
    let leftIdx = 0;
    let leftVal = arr[leftIdx];

    let rightIdx = arr.length - 1;
    let rightVal = arr[rightIdx];

    if (arr.length == 1 || leftVal < rightVal) return 0;

    while (leftIdx <= rightIdx) {
        let middleIdx = Math.floor((leftIdx + rightIdx) / 2);

        let middleVal = arr[middleIdx];
        let middleVal2 = arr[middleIdx + 1];
        leftVal = arr[leftIdx];

        if (middleVal > middleVal2)
            return middleIdx + 1;
        else if (leftVal <= middleVal)
            leftIdx = middleIdx + 1;
        else
            rightIdx = middleIdx - 1;
    }

    return -1;
}

function binarySearch(arr, leftIdx, rightIdx, val) {

    while (leftIdx <= rightIdx) {
        // find the middle value
        let middleIdx = Math.floor((leftIdx + rightIdx) / 2);
        let middleVal = arr[middleIdx];

        if (middleVal < val) {
            // middleVal is too small, look at the right half
            leftIdx = middleIdx + 1;
        } else if (middleVal > val) {
            // middleVal is too large, look at the left half
            rightIdx = middleIdx - 1;
        } else {
            // we found our value!
            return middleIdx;
        }
    }

    // left and right pointers crossed, val isn't in arr
    return -1;
}

module.exports = findRotatedIndex