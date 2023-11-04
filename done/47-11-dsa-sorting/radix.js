function getDigit(num, i) {
    return Math.floor(Math.abs(num) / Math.pow(10, i)) % 10;
}

function digitCount(num) {
    if (num === 0) return 1;
    return Math.floor(Math.log10(Math.abs(num))) + 1;
}

function mostDigits(nums) {
    let maxDigits = 0;
    for (let i = 0; i < nums.length; i++) {
        maxDigits = Math.max(maxDigits, digitCount(nums[i]));
    }
    return maxDigits;
}

function radixSort(nums) {

    // Find the largest element of the array
     let max = nums[0];
     for (let i = 1; i < nums.length; i++) {
       if (nums[i] > max)
         max = nums[i];
     }

    let maxDigitCount = digitCount(max); //get its digit count

    for (let k = 0; k < maxDigitCount; k++) {
        let digitBuckets = Array.from({
            length: 10
        }, () => []);
        for (let i = 0; i < nums.length; i++) {
            let num = nums[i];
            let digit = getDigit(num, k);
            digitBuckets[digit].push(num);
        }
        nums = [].concat(...digitBuckets);
    }
    return nums;
}

module.exports = {
    getDigit,
    digitCount,
    mostDigits,
    radixSort
};

let a = [8, 6, 1, 12]