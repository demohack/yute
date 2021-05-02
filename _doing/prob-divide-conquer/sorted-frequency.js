function sortedFrequency(arr, val) {
    let leftIdx = _binarySearchLeftIndex(arr, val);
    let rightIdx = _binarySearchRightIndex(arr, val);

    if ((leftIdx >= 0) && (rightIdx >= 0)) {
        return rightIdx - leftIdx + 1;
    }

    return -1;
}

function _binarySearchLeftIndex(arr, val) {

    let leftIdx = 0;
    let rightIdx = arr.length - 1;

    console.log(arr.slice(leftIdx,rightIdx+1))
    while (leftIdx <= rightIdx) {
        // find the middle value
        let middleIdx = Math.floor((leftIdx + rightIdx) / 2);
        let middleVal = arr[middleIdx];
        let middleVal0 = arr[middleIdx-1];
        let middleVal2 = arr[middleIdx+1];

        if (middleVal < val) {
            // middleVal is too small, look at the right half
            leftIdx = middleIdx + 1;
            console.log(arr.slice(leftIdx, rightIdx + 1))
        } else if (middleVal > val) {
            // middleVal is too large, look at the left half
            rightIdx = middleIdx - 1;
            console.log(arr.slice(leftIdx, rightIdx + 1))
        } else {
            // middleVal == val
            // look for left index
            if (leftIdx == rightIdx && leftIdx == middleIdx) {
                // one item in sub-array
                if (middleVal == val) {
                    return middleIdx;
                } else {
                    return -1;
                }
            } else if ((rightIdx - leftIdx) + 1 == 2) {
                // two item in sub-array
                if (middleVal == val) {
                    return middleIdx;
                } else if (middleVal2 == val) {
                    return middleIdx + 1;
                } else {
                    return -1;
                }
            } else {
                if (middleVal0 < val) {
                    return middleIdx;
                } else {
                    rightIdx = middleIdx - 1;
                    console.log(arr.slice(leftIdx, rightIdx + 1))
                }
            }
        }
    }

    // left and right pointers crossed, val isn't in arr
    return -1;
}

function _binarySearchRightIndex(arr, val) {

    let leftIdx = 0;
    let rightIdx = arr.length - 1;

    console.log(arr.slice(leftIdx,rightIdx+1))
    while (leftIdx <= rightIdx) {
        // find the middle value
        let middleIdx = Math.floor((leftIdx + rightIdx) / 2);
        let middleVal = arr[middleIdx];
        let middleVal0 = arr[middleIdx-1];
        let middleVal2 = arr[middleIdx+1];

        if (middleVal < val) {
            // middleVal is too small, look at the right half
            leftIdx = middleIdx + 1;
            console.log(arr.slice(leftIdx, rightIdx + 1))
        } else if (middleVal > val) {
            // middleVal is too large, look at the left half
            rightIdx = middleIdx - 1;
            console.log(arr.slice(leftIdx, rightIdx + 1))
        } else {
            // middleVal == val
            // look for left index
            if (leftIdx == rightIdx && leftIdx == middleIdx) {
                // one item in sub-array
                if (middleVal == val) {
                    return middleIdx;
                } else {
                    return -1;
                }
            } else if ((rightIdx - leftIdx) + 1 == 2) {
                // two item in sub-array
                if (middleVal2 == val) {
                    return middleIdx + 1;
                } else if (middleVal == val) {
                    return middleIdx;
                } else {
                    return -1;
                }
            } else {
                if (middleVal2 > val) {
                    return middleIdx;
                } else {
                    leftIdx = middleIdx + 1;
                    console.log(arr.slice(leftIdx, rightIdx + 1))
                }
            }
        }
    }

    // left and right pointers crossed, val isn't in arr
    return -1;
}

module.exports = sortedFrequency

let a1 = [1];
let a11 = [1,1];
let a12 = [1,2];
let a111 = [1,1,1];
let a112 = [1,1,2];
let a122 = [1,2,2];
let a123 = [1,2,3];
let a1111 = [1,1,1,1];
let a1112 = [1,1,1,2];
let a1122 = [1,1,2,2];
let a1222 = [1,2,2,2];
let a1223 = [1,2,2,3];
let a1233 = [1,2,3,3];
let a1234 = [1,2,3,4];
let a11111 = [1,1,1,1,1];
let a11112 = [1,1,1,1,2];
let a11122 = [1,1,1,2,2];
let a11222 = [1,1,2,2,2];
let a12222 = [1,2,2,2,2];
let a11123 = [1,1,1,2,3];
let a11223 = [1,1,2,2,3];
let a12223 = [1,2,2,2,3];
let a12233 = [1,2,2,3,3];
let a12333 = [1,2,3,3,3];
let a12234 = [1,2,2,3,4];
let a12334 = [1,2,3,3,4];
let a12344 = [1,2,3,4,4];
let a12345 = [1,2,3,4,5];
