"use strict";
exports.__esModule = true;
var Node = /** @class */ (function () {
    function Node(k, x, y, z) {
        if (x === void 0) { x = null; }
        if (y === void 0) { y = null; }
        if (z === void 0) { z = null; }
        this.parent = x;
        this.left = y;
        this.right = z;
        this.key = k;
    }
    return Node;
}());
exports.Node = Node;
var BST = /** @class */ (function () {
    function BST() {
        this.root = null;
        this.flag = null;
    }
    BST.prototype.create = function (a) {
        this.random_insert(a.concat());
        return this.root;
    };
    BST.prototype.random_insert = function (a) {
        var l = a.length;
        if (l !== 0) {
            var i = Math.floor(Math.random() * l);
            var node = new Node(a.splice(i, 1)[0]);
            this.insert(node);
            this.random_insert(a);
        }
    };
    BST.prototype.insert = function (z) {
        var y = null;
        var x = this.root;
        while (x !== null) {
            y = x;
            if (z.key < x.key) {
                x = x.left;
            }
            else {
                x = x.right;
            }
        }
        z.parent = y;
        if (y === null) {
            this.root = z;
        }
        else if (z.key < y.key) {
            y.left = z;
        }
        else {
            y.right = z;
        }
    };
    BST.prototype["delete"] = function (z) {
        if (z.left === null) {
            this._transplant(z, z.right);
        }
        else if (z.right === null) {
            this._transplant(z, z.left);
        }
        else {
            var y = this.successor(z);
            if (y.parent != z) {
                this._transplant(y, y.right);
                y.right = z.right;
                y.right.parent = y;
            }
            this._transplant(z, y);
            y.left = z.left;
            y.left.parent = y;
        }
    };
    BST.prototype._transplant = function (u, v) {
        if (u.parent === null) {
            this.root = v;
        }
        else if (u === u.parent.left) {
            u.parent.left = v;
        }
        else {
            u.parent.right = v;
        }
        if (v !== null) {
            v.parent = u.parent;
        }
    };
    BST.prototype.search = function (k) {
        var x = this.root;
        while (x !== null && k !== x.key) {
            if (k < x.key) {
                x = x.left;
            }
            else {
                x = x.right;
            }
        }
        return x;
    };
    BST.prototype.minimum = function (x) {
        while (x.left !== null) {
            x = x.left;
        }
        return x;
    };
    BST.prototype.maximum = function (x) {
        while (x.right !== null) {
            x = x.right;
        }
        return x;
    };
    BST.prototype.successor = function (x) {
        if (x.right !== null) {
            return this.minimum(x.right);
        }
        var y = x.parent;
        while (y !== null && x === y.right) {
            x = y;
            y = y.parent;
        }
        return y;
    };
    BST.prototype.predecessor = function (x) {
        if (x.left !== null) {
            return this.maximum(x.left);
        }
        var y = x.parent;
        while (y !== null && x === y.left) {
            x = y;
            y = y.parent;
        }
        return y;
    };
    BST.prototype.inorder_traverse = function (f) {
        this._inorder_traverse(this.root, f);
    };
    BST.prototype._inorder_traverse = function (x, f) {
        if (x !== this.flag) {
            this._inorder_traverse(x.left, f);
            f(x.key);
            this._inorder_traverse(x.right, f);
        }
    };
    return BST;
}());
exports.BST = BST;
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
