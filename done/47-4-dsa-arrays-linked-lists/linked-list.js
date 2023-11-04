/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val) {
    let node = new Node(val);
    if (this.head == null && this.tail == null) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }

    this.length++;
    return node.val;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    let node = new Node(val);
    if (this.head == null && this.tail == null) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head;
      this.head = node;
    }

    this.length++;
    return node;
  }

  /** pop(): return & remove last item. */

  pop() {
    // traverse node from head until node.next == tail
    if (this.head == this.tail) {
      let node = this.head;
      this.head = null;
      this.tail = null;
      this.length--;
      return node.val;
    } else if (this.head) {
      let node = this.head;
      let node2 = this.tail;

      while (node.next != this.tail) {
        node = node.next;
      }

      this.tail = node;
      this.tail.next = null;
      this.length--;
      return node2.val;
    }
  }

  /** shift(): return & remove first item. */

  shift() {
    let node = this.head;
    if (this.head) {
      if (this.head == this.tail) {
        this.head = null;
        this.tail = null;
      } else {
        this.head = node.next;
        node.next = null;
      }
      this.length--;
      return node.val;
    }
  }

  /** getAt(idx): get val at idx. */

  getNodeAt(idx) {
    let i = 0;
    let node = this.head;

    while (i < idx && node.next != null) {
      i++;
      node = node.next;
    }

    if (i < idx) {
      node = null;
    }

    return node;
  }

  getAt(idx) {
    let i = 0;
    let node = this.head;

    while (i < idx && node.next != null) {
      i++;
      node = node.next;
    }

    if (i < idx) {
      node = null;
    }

    return node.val;
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    let node = this.getNodeAt(idx);
    if (node) {
      node.val = val;
    }
    return node.val;
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    if (idx == 0) {
      this.unshift(val)
      return val;
    } else if (idx > this.length) {
      return null;
    } else if (idx == this.length) {
      this.push(val)
      return val;
    } else {
      let node = this.getNodeAt(idx-1);
      let node3 = node.next;
      let node2 = new Node(val);

      node.next = node2;
      node2.next = node3;

      this.length++;
      return node2.val;
    }
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    if (idx == 0) {
      return this.shift();
    } else if (idx > this.length) {
      return null;
    } else if (idx == this.length) {
      return this.pop();
    } else {
      let node = this.getNodeAt(idx-1);
      let node2 = node.next;
      let node3 = node2.next;
      node.next = node3;
      node2.next = null;
      this.length--;
      return node2;
    }
  }

  /** average(): return an average of all values in the list */

  average() {
    if (this.head == this.tail) {
      return 0;
    }

    let node = this.head;
    let sum = 0;

    while (node != null) {
      sum += node.val;
      node = node.next;
    }

    return sum / this.length;
  }
}

module.exports = LinkedList;
