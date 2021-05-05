function findFloor(arr, val) {
    let idx = binarySearchFloor(arr, val);

    if (idx >= 0)
        return arr[idx];

    return -1;
}

function binarySearchFloor(arr, val) {

    let leftIdx = 0;
    let rightIdx = arr.length - 1;

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

    // assert: leftIdx > rightIdx
    if (val > arr[rightIdx])
        return rightIdx;

    // left and right pointers crossed, val isn't in arr
    return -1;
}


module.exports = findFloor