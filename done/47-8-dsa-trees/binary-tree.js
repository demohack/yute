/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }

  minDepth(level = 0) {

    let leftCount = 0;
    let rightCount = 0;

    if (this.left != null)
      leftCount = this.left.minDepth(level + 1);

    if (this.right != null)
      rightCount = this.right.minDepth(level + 1);

    if (leftCount >= 1 && rightCount >= 1)
      return (leftCount < rightCount ? leftCount : rightCount) + 1;
    else if (leftCount >= 1)
      return leftCount + 1;
    else if (rightCount >= 1)
      return rightCount + 1;

    return 1;
  }

  maxDepth(level = 0) {

    let leftCount = 0;
    let rightCount = 0;

    if (this.left != null)
      leftCount = this.left.maxDepth(level + 1);

    if (this.right != null)
      rightCount = this.right.maxDepth(level + 1);

    if (leftCount >= 1 && rightCount >= 1)
      return (leftCount > rightCount ? leftCount : rightCount) + 1;
    else if (leftCount >= 1)
      return leftCount + 1;
    else if (rightCount >= 1)
      return rightCount + 1;

    return 1;
  }

  maxSum(level = 0) {

    let leftSum = 0;
    let rightSum = 0;

    if (this.left != null)
      leftSum = this.left.maxSum(level + 1);

    if (this.right != null)
      rightSum = this.right.maxSum(level + 1);

    if (level == 0)
      return this.val + leftSum + rightSum;

    if (leftSum >= 1 && rightSum >= 1)
      return (leftSum > rightSum ? leftSum : rightSum) + this.val;
    else if (leftSum >= 1)
      return leftSum + this.val;
    else if (rightSum >= 1)
      return rightSum + this.val;

    return Math.max(0, this.val + leftSum + rightSum);
  }

  nextLarger(lowerBound, level = 0) {

    let leftLarger = null;
    let rightLarger = null;

    if (this.left != null)
      leftLarger = this.left.nextLarger(lowerBound, level + 1);

    if (this.right != null)
      rightLarger = this.right.nextLarger(lowerBound, level + 1);

    let larger = this._nextLarger(leftLarger, rightLarger, lowerBound);

    return this._nextLarger(larger, this.val, lowerBound);
  }

  _nextLarger(leftLarger, rightLarger, lowerBound) {
    if (leftLarger != null && rightLarger != null) {
      if (leftLarger > lowerBound && rightLarger > lowerBound) {
        return (leftLarger < rightLarger ? leftLarger : rightLarger);
      } else if (leftLarger > lowerBound) {
        return leftLarger;
      } else if (rightLarger > lowerBound) {
        return rightLarger;
      } else {
        return null;
      }
    } else if (leftLarger != null) {
      return (leftLarger > lowerBound ? leftLarger : null);
    } else if (rightLarger != null) {
      return (rightLarger > lowerBound ? rightLarger : null);
    }

    return null;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    if (this.root != null)
      return this.root.minDepth();

    return 0;
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    if (this.root != null)
      return this.root.maxDepth();

    return 0;
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    if (this.root != null)
      return this.root.maxSum();

    return 0;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    if (this.root != null)
      return this.root.nextLarger(lowerBound);

    return null;
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {

  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize() {

  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize() {

  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {

  }
}

module.exports = { BinaryTree, BinaryTreeNode };

// let smallTree;
// let largeTree;
// let emptyTree;

// function beforeEach() {
//   emptyTree = new BinaryTree();

//   // build small tree;
//   let smallLeft = new BinaryTreeNode(5);
//   let smallRight = new BinaryTreeNode(5);
//   let smallRoot = new BinaryTreeNode(6, smallLeft, smallRight);
//   smallTree = new BinaryTree(smallRoot);

//   // build large tree
//   let node6 = new BinaryTreeNode(1);
//   let node5 = new BinaryTreeNode(1);

//   let node4 = new BinaryTreeNode(2);

//   let node3 = new BinaryTreeNode(3, node4, node6);
//   let node2 = new BinaryTreeNode(5, node3, node5);

//   let node1 = new BinaryTreeNode(5);

//   let root = new BinaryTreeNode(6, node1, node2);
//   largeTree = new BinaryTree(root);
// };


// beforeEach();
// console.log("smallTree.minDepth() == 2", smallTree.minDepth() == 2);
// console.log("largeTree.minDepth() == 2", largeTree.minDepth() == 2);
// console.log("emptyTree.minDepth() == 0", emptyTree.minDepth() == 0);

// console.log("smallTree.maxDepth() == 2", smallTree.maxDepth() == 2);
// console.log("largeTree.maxDepth() == 4", largeTree.maxDepth() == 4);
// console.log("emptyTree.maxDepth() == 0", emptyTree.maxDepth() == 0);

// console.log("smallTree.maxSum() == 16", smallTree.maxSum() == 16);
// console.log("largeTree.maxSum() == 21", largeTree.maxSum() == 21);
// console.log("emptyTree.maxSum() == 0", emptyTree.maxSum() == 0);

// let nodeNeg4 = new BinaryTreeNode(-4);
// let node2 = new BinaryTreeNode(2, nodeNeg4);

// let node100 = new BinaryTreeNode(100);
// let node8 = new BinaryTreeNode(8);
// let nodeNeg3 = new BinaryTreeNode(-3, node8, node100);

// let root = new BinaryTreeNode(10, node2, nodeNeg3);
// let tree = new BinaryTree(root);
// console.log("tree.maxSum() == 109", tree.maxSum() == 109);


// console.log("smallTree.nextLarger(4) == 5", smallTree.nextLarger(4) == 5);
// console.log("smallTree.nextLarger(5) == 6", smallTree.nextLarger(5) == 6);
// console.log("smallTree.nextLarger(6) == null", smallTree.nextLarger(6) == null);

// console.log("emptyTree.nextLarger(0) == null", emptyTree.nextLarger(0) == null);

// console.log("largeTree.nextLarger(1) == 2", largeTree.nextLarger(1) == 2);
// console.log("largeTree.nextLarger(2) == 3", largeTree.nextLarger(2) == 3);
// console.log("largeTree.nextLarger(3) == 5", largeTree.nextLarger(3) == 5);
// console.log("largeTree.nextLarger(4) == 5", largeTree.nextLarger(4) == 5);
// console.log("largeTree.nextLarger(5) == 6", largeTree.nextLarger(5) == 6);
// console.log("largeTree.nextLarger(6) == null", largeTree.nextLarger(6) == null);

