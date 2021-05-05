function countZeroes(arr) {
  // Given an array of 1s and 0s which has all 1s first followed by all 0s,
  // write a function called countZeroes, which returns the number of zeroes
  // in the array.

  return arr.length - _binarySearch(arr);
}

function _binarySearch(arr, val = 0) {

  let leftIdx = 0;
  let rightIdx = arr.length - 1;

  while (leftIdx <= rightIdx) {
    // find the middle value
    let middleIdx = Math.floor((leftIdx + rightIdx) / 2);
    let middleVal = arr[middleIdx];
    let middleVal0 = arr[middleIdx - 1];

    if (middleVal > val) {
      // middleVal is too small, look at the right half
      leftIdx = middleIdx + 1;
    } else if (middleVal0 > val) {
      // we found our value!
      return middleIdx;
    } else {
      // middleVal is too large, look at the left half
      rightIdx = middleIdx - 1;
    }
  }

  // left and right pointers crossed, val isn't in arr
  return -1;
}

module.exports = countZeroes