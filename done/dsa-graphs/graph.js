class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }

  addAdjacent(node) {
    this.adjacent.add(node);
  }

  removeAdjacent(node) {
    if (this.adjacent.has(node))
      this.adjacent.delete(node);
  }

  hasAdjacent(vertex) {
    return this.adjacent.has(vertex);
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(node) {
    this.nodes.add(node);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(nodeArray) {
    for (let node of nodeArray) {
      this.nodes.add(node);
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.addAdjacent(v2);
    v2.addAdjacent(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    if (v1.hasAdjacent(v2))
      v1.removeAdjacent(v2);
    if (v2.hasAdjacent(v1))
      v2.removeAdjacent(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    for (let node of this.nodes) {
      if (node.hasAdjacent(vertex)) {
        node.removeAdjacent(vertex);
      }
    }

    if (this.nodes.has(vertex)) {
      this.nodes.delete(vertex);
    }
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    // Create an empty stack
    const stack = [];
    const result = [];
    const visited = new Set();
    let node;

    // visit node
    stack.push(start);
    visited.add(start);

    // while there are still neighbors to visit
    while (stack.length) {
      node = stack.pop();
      result.push(node.value);

      // visit neighbors and push onto stack
      node.adjacent.forEach(neighbor => {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          stack.push(neighbor);
        }
      });
    }

    return result;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {

    // Create an empty stack
    const queue = [];
    const result = [];
    const visited = new Set();
    let node;

    // visit node
    queue.push(start);
    visited.add(start);

    // while there are still neighbors to visit
    while (queue.length) {
      node = queue.shift();
      result.push(node.value);

      // visit neighbors and push onto stack
      node.adjacent.forEach(neighbor => {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      });
    }

    return result;
  }
}

module.exports = {Graph, Node}