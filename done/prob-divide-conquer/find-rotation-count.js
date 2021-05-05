function findRotationCount(arr) {
    return binarySearchPivotPoint(arr);
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

module.exports = findRotationCount