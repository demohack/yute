class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }

  insert(node) {
    if (node.val < this.val) {
      if (this.left == null) {
        this.left = node;
      } else {
        this.left.insert(node);
      }
    } else if (node.val >= this.val) {
      if (this.right == null) {
        this.right = node;
      } else {
        this.right.insert(node);
      }
    }
  }

  find(val) {
    if (val < this.val) {
      if (this.left != null) {
        return this.left.find(val);
      }
    } else if (val > this.val) {
      if (this.right != null) {
        return this.right.find(val);
      }
    } else {
      return this;
    }

    return undefined;
  }

  dfsPreOrder() {
    let left_arr = [];
    let right_arr = [];

    if (this.left != null) {
      left_arr = this.left.dfsPreOrder();
    }

    if (this.right != null) {
      right_arr = this.right.dfsPreOrder();
    }

    return [this.val].concat(left_arr).concat(right_arr);
  }

  dfsInOrder() {
    let left_arr = [];
    let right_arr = [];

    if (this.left != null) {
      left_arr = this.left.dfsInOrder();
    }

    if (this.right != null) {
      right_arr = this.right.dfsInOrder();
    }

    return left_arr.concat([this.val]).concat(right_arr);
  }

  dfsPostOrder() {
    let left_arr = [];
    let right_arr = [];

    if (this.left != null) {
      left_arr = this.left.dfsPostOrder();
    }

    if (this.right != null) {
      right_arr = this.right.dfsPostOrder();
    }

    return left_arr.concat(right_arr).concat([this.val]);
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    let new_node = new Node(val);
    let this_node = null;

    if (this.root == null) {
      this.root = new_node;
    } else {

      this_node = this.root;

      while (this_node != null) {
        if (new_node.val < this_node.val) {
          if (this_node.left == null) {
            this_node.left = new_node;
            break;
          } else {
            this_node = this_node.left;
          }
        } else if (new_node.val >= this_node.val) {
          if (this_node.right == null) {
            this_node.right = new_node;
            break;
          } else {
            this_node = this_node.right;
          }
        }
      }
    }

    return this;
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val) {
    let node = new Node(val);

    if (this.root == null) {
      this.root = node;
    } else {
      this.root.insert(node);
    }

    return this;
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    let node = this.root;

    while (node != null) {
      if (val < node.val) {
        if (node.left == null) {
          break;
        } else {
          node = node.left;
        }
      } else if (val > node.val) {
        if (node.right == null) {
          break;
        } else {
          node = node.right;
        }
      } else {
        return node;
      }
    }

    return undefined;
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val) {
    if (this.root != null) {
      return this.root.find(val);
    }

    return undefined;
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    if (this.root != null) {
      return this.root.dfsPreOrder();
    }

    return [];
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    if (this.root != null) {
      return this.root.dfsInOrder();
    }

    return [];
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    if (this.root != null) {
      return this.root.dfsPostOrder();
    }

    return [];
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    let queue = [];
    let data = [];
    let node = null;

    queue.push(this.root);

    while (queue.length) {
      node = queue.shift();
      data.push(node.val);
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }

    return data;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {

  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {

  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {

  }
}


module.exports = BinarySearchTree;

// let binarySearchTree = new BinarySearchTree();
// binarySearchTree
//   .insert(15)
//   .insert(20)
//   .insert(10)
//   .insert(12)
//   .insert(1)
//   .insert(5)
//   .insert(50);
//   console.log("binarySearchTree.dfsPreOrder() = ", binarySearchTree.dfsPreOrder(), "expected [15, 10, 1, 5, 12, 20, 50]");

// let binarySearchTree = new BinarySearchTree();
// binarySearchTree
//   .insert(15)
//   .insert(20)
//   .insert(10)
//   .insert(12)
//   .insert(1)
//   .insert(5)
//   .insert(50);
// console.log("binarySearchTree.dfsInOrder() = ", binarySearchTree.dfsInOrder(), "expected [1, 5, 10, 12, 15, 20, 50]");

// let binarySearchTree = new BinarySearchTree();
// binarySearchTree
//   .insert(15)
//   .insert(20)
//   .insert(10)
//   .insert(12)
//   .insert(1)
//   .insert(5)
//   .insert(50);
// console.log("binarySearchTree.dfsPostOrder() = ", binarySearchTree.dfsPostOrder(), "expected [5, 1, 12, 10, 50, 20, 15]");