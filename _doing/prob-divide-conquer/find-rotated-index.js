function findRotatedIndex(arr, val) {
    let pivotIdx = findPivotIdx(arr, 0, arr.length - 1);
}

function binarySearchPivotPoint(arr, leftIdx, rightIdx) {

    if (arr.length == 0) {
        return -1;
    } else if (arr.length == 1) {
        return 0;
    } else if (arr.length == 2) {
        let middleVal = arr[leftIdx];
        let middleVal2 = arr[rightIdx];
        if (middleVal <= middleVal2) {
            return leftIdx;
        } else {
            return rightIdx;
        }
    } else {

    }
}


module.exports = findRotatedIndex