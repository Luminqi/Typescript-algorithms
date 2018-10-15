class Node {
  parent: this | null
  left: this | null
  right: this | null
  key: number
  constructor (k: number, x = null, y = null, z = null) {
    this.parent = x
    this.left = y
    this.right = z
    this.key = k
  }
}

class BST<T extends Node> {
  root: T | null = null
  flag: T | null = null 
  create(a: number[]) {
    this.random_insert(a.concat())
    return this.root
  }

  random_insert (a: number[]) {
    let l = a.length
    if (l !== 0) {
      let i = Math.floor(Math.random() * l)
      let node = <T>new Node(a.splice(i, 1)[0])
      this.insert(node)
      this.random_insert(a)
    }
  }

  insert (z: T) {
    let y = null
    let x = this.root
    while (x !== null) {
      y = x
      if (z.key < x.key) {
        x = x.left
      } else {
        x = x.right
      }
    }
    z.parent = y
    if (y === null) {
      this.root = z
    } else if (z.key < y.key) {
      y.left = z
    } else {
      y.right = z
    }
  }

  delete (z: T) {
    if (z.left === null) {
      this._transplant(z, z.right)
    } else if (z.right === null) {
      this._transplant(z, z.left)
    } else {
      let y = this.successor(z)
      if (y.parent != z) {
        this._transplant(y, y.right)
        y.right = z.right
        y.right.parent = y
      }
      this._transplant(z, y)
      y.left = z.left
      y.left.parent = y
    }
  }

  _transplant (u: T, v: T) {
    if (u.parent === null) {
      this.root = v
    } else if (u === u.parent.left) {
      u.parent.left = v
    } else {
      u.parent.right = v
    }
    if (v !== null) {
      v.parent = u.parent
    }
  }

  search (k: number) {
    let x = this.root
    while ( x !== null && k !== x.key) {
      if (k < x.key) {
        x = x.left
      } else {
        x = x.right
      }
    }
    return x
  }

  minimum (x: T) {
    while (x.left !== null) {
      x = x.left
    }
    return x
  }

  maximum (x: T) {
    while (x.right !== null) {
      x = x.right
    }
    return x
  }

  successor (x: T) {
    if (x.right !== null) {
      return this.minimum(x.right)
    }
    let y = x.parent
    while (y !== null && x === y.right) {
      x = y
      y = y.parent
    }
    return y
  }

  predecessor (x: T) {
    if (x.left !== null) {
      return this.maximum(x.left)
    }
    let y = x.parent
    while (y !== null && x === y.left) {
      x = y
      y = y.parent
    }
    return y
  }

  inorder_traverse (f: (x: number) => void) {
    this._inorder_traverse(this.root, f)
  }

  _inorder_traverse (x: T, f: (x: number) => void) {
    if (x !== this.flag) {
      this._inorder_traverse(x.left, f)
      f(x.key)
      this._inorder_traverse(x.right, f)
    }
  }
}

export {Node, BST}

// test
// let tree = new BST<Node>()
// let root = tree.create([1,2,3,4])
// console.log(root);
// tree.inorder_traverse(console.log);
// let node = tree.search(4);
// tree.delete(node);
// console.log(tree);
// tree.inorder_traverse(console.log);
// console.log("!");

