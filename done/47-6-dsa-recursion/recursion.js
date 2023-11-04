/** product: calculate the product of an array of numbers. */

function product(nums) {
  if (nums == []) return 1;
  if (nums.length == 1) return nums[0];

  let [a, ...rest] = nums;

  return a * product(rest);
}

/** longest: return the length of the longest word in an array of words. */

function longest(words) {
  if (words == []) return 0;
  if (words.length == 1) return words[0].length;

  let [a, ...rest] = words;

  let m = a.length;
  let n = longest(rest);

  return m > n ? m : n;
}

/** everyOther: return a string with every other letter. */

function everyOther(str) {
  if (str.length <= 1) return str;
  if (str.length == 2) return str[0];
  if (str.length == 3) return str[0] + str[2];

  let [a, b, ...rest] = str;

  return a + everyOther(rest.join(''));
}

/** isPalindrome: checks whether a string is a palindrome or not. */

function isPalindrome(str) {
  str = str.toLowerCase();

  if (str.length <= 1) return true;
  if (str.length == 2) return str[0] === str[1];
  if (str.length == 3) return str[0] === str[2];

  let a = str[0];
  let z = str.slice(-1);
  let rest = str.slice(1, -1);

  return (a === z) && isPalindrome(rest);
}

/** findIndex: return the index of val in arr (or -1 if val is not present). */

function findIndex(arr, val, idx = 0) {
  if (idx >= arr.length) return -1;
  if (arr[idx] == val) return idx;
  return findIndex(arr, val, idx + 1);
}

/** revString: return a copy of a string, but in reverse. */

function revString(str) {
  if (str.length <= 1) return str;

  let [a, ...rest] = str;

  return revString(rest.join('')) + a;
}

/** gatherStrings: given an object, return an array of all of the string values. */

function gatherStrings(obj) {
  let arr = [];
  for (let key in obj) {
    if (typeof obj[key] === "string") arr.push(obj[key]);
    if (typeof obj[key] === "object") arr.push(...gatherStrings(obj[key]));
  }
  return arr;
}

/** binarySearch: given a sorted array of numbers, and a value,
 * return the index of that value (or -1 if val is not present). */

function binarySearch(arr, val, left = 0, right = arr.length) {
  if (left > right) return -1;

  let middle = Math.floor((right + left) / 2);

  if (arr[middle] === val) return middle;

  if (arr[middle] > val) return binarySearch(arr, val, left, middle - 1);

  return binarySearch(arr, val, middle + 1, right);
}

module.exports = {
  product,
  longest,
  everyOther,
  isPalindrome,
  findIndex,
  revString,
  gatherStrings,
  binarySearch
};