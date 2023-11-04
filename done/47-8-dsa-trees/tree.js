/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }

  sumValues() {
    let sum = this.val;

    if (this.children) {
      for (let i = 0; i < this.children.length; i++) {
        let k = this.children[i];
        sum += k.sumValues();
      }
    }

    return sum;
  }

  countEvens() {
    let count = (this.val % 2) == 0 ? 1 : 0;

    if (this.children) {
      for (let i = 0; i < this.children.length; i++) {
        let k = this.children[i];
        count += k.countEvens();
      }
    }

    return count;
  }

  numGreater(lowerBound) {
    let count = (this.val > lowerBound) ? 1 : 0;

    if (this.children) {
      for (let i = 0; i < this.children.length; i++) {
        let k = this.children[i];
        count += k.numGreater(lowerBound);
      }
    }

    return count;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */

  sumValues() {
    if (this.root)
      return this.root.sumValues();

    return 0;
  }

  /** countEvens(): count all of the nodes in the tree with even values. */

  countEvens() {
    if (this.root)
      return this.root.countEvens();

    return 0;
  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

  numGreater(lowerBound) {
    if (this.root)
      return this.root.numGreater(lowerBound);

    return 0;
  }
}

module.exports = {
  Tree,
  TreeNode
};

// let smallTree;
// let largeTree;
// let emptyTree;

// function beforeEach() {
//   emptyTree = new Tree();

//   // build small tree
//   let nSmall = new TreeNode(1);
//   let nSmall2 = new TreeNode(2);
//   nSmall.children.push(nSmall2);
//   smallTree = new Tree(nSmall);

//   // build large tree
//   let n = new TreeNode(1);
//   let n2 = new TreeNode(2);
//   let n3 = new TreeNode(3);
//   let n4 = new TreeNode(4);
//   let n5 = new TreeNode(5);
//   let n6 = new TreeNode(6);
//   let n7 = new TreeNode(7);
//   let n8 = new TreeNode(8);

//   n.children = [n2, n3, n4];

//   n4.children.push(n5, n6);
//   n6.children.push(n7);
//   n7.children.push(n8);

//   largeTree = new Tree(n);
// };

// beforeEach();
// console.log("smallTree.numGreater() == 3", smallTree.numGreater(0) == 2);
// console.log("largeTree.numGreater() == 36", largeTree.numGreater(0) == 8);

// console.log("smallTree.numGreater() == 3", smallTree.numGreater(1) == 1);
// console.log("largeTree.numGreater() == 36", largeTree.numGreater(4) == 4);

// console.log("smallTree.numGreater() == 3", smallTree.numGreater(2) == 0);
// console.log("largeTree.numGreater() == 36", largeTree.numGreater(8) == 0);

// console.log("emptyTree.numGreater() == 0", emptyTree.numGreater() == 0);