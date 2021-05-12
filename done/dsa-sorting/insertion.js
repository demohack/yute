function insertionSort(arr) {
  // # Traverse through 1 to len(arr)
  // for i in range(1, len(arr)):
  for (let i = 0; i < arr.length; i++) {
    //     key = arr[i]
    let key = arr[i];
    //     # Move elements of arr[0..i-1], that are
    //     # greater than key, to one position ahead
    //     # of their current position
    //     j = i-1
    let j = i - 1;
    //     while j >=0 and key < arr[j] :
    while (j >= 0 && key < arr[j]) {
      //         arr[j+1] = arr[j]
      arr[j + 1] = arr[j];
      //         j -= 1
      j--;
    }
    //     arr[j+1] = key
    arr[j + 1] = key;
  }

  return arr;
}

module.exports = insertionSort;