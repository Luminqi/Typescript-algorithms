import { Node, BST } from "../BST/BST"

enum Color {
  Red,
  Black
}

class RB_Node extends Node {
  color: Color
  constructor (c: Color, k: number, x: RB_Node = null, y: RB_Node = null, z: RB_Node = null) {
    super(k, x, y, z)
    this.color = c
  }
}

class RBT<T extends RB_Node> extends BST<T> {
  nil: T =  <T>new RB_Node(Color.Black, 0, null, null, null)
  root: T = this.nil
  flag: T = this.nil
  constructor () {
    super()
  }

  create (a: number[]) : T {
    this.random_insert(a.concat())
    return this.root
  }

  random_insert (a: number[]) {
    let l = a.length
    if (l !== 0) {
      let i = Math.floor(Math.random() * l)
      let node = <T>new RB_Node(Color.Red, a.splice(i, 1)[0], this.nil, this.nil, this.nil)
      this.insert(node)
      this.random_insert(a)
    }
  }

  insert (z: T) {
    let y = this.nil
    let x = this.root
    while (x !== this.nil) {
      y = x
      if (z.key < x.key) {
        x = x.left
      } else {
        x = x.right
      }
    }
    z.parent = y
    if (y === this.nil) {
      this.root = z
    } else if (z.key < y.key) {
      y.left = z
    } else {
      y.right = z
    }
    z.left = this.nil
    z.right = this.nil
    this.insert_fixup(z)
  }
  
  insert_fixup(z: T) {
    while (z.parent.color === Color.Red) {
      if (z.parent === z.parent.parent.left) {
        let y = z.parent.parent.right
        if (y.color === Color.Red) {
          z.parent.color = Color.Black
          y.color = Color.Black
          z.parent.parent.color = Color.Red
          z = z.parent.parent
        } else {
          if (z === z.parent.right) {
            z = z.parent
            this.left_rotate(z)
          }
          z.parent.color = Color.Black
          z.parent.parent.color = Color.Red
          this.right_rotate(z.parent.parent)
        }
      } else {
        let y = z.parent.parent.left
        if (y.color === Color.Red) {
          z.parent.color = Color.Black
          y.color = Color.Black
          z.parent.parent.color = Color.Red
          z = z.parent.parent
        } else {
          if (z === z.parent.left) {
            z = z.parent
            this.right_rotate(z)
          }
          z.parent.color = Color.Black
          z.parent.parent.color = Color.Red
          this.left_rotate(z.parent.parent)
        }
      }
    }
    this.root.color = Color.Black
  }

  left_rotate (x : T) {
    let y = x.right
    x.right = y.left
    if (y.left !== this.nil) {
      y.left.parent = x
    }
    y.parent = x.parent
    if (x.parent === this.nil) {
      this.root = y
    } else if (x === x.parent.left) {
      x.parent.left = y
    } else {
      x.parent.right = y
    }
    y.left = x
    x.parent = y
  }

  right_rotate (x : T) {
    let y = x.left
    x.left = y.right
    if (y.right !== this.nil) {
      y.right.parent = x
    }
    y.parent = x.parent
    if (x.parent === this.nil) {
      this.root = y
    } else if (x === x.parent.left) {
      x.parent.left = y
    } else {
      x.parent.right = y
    }
    y.right = x
    x.parent = y
  }
}
