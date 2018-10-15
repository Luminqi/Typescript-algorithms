"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var BST_1 = require("./BST");
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Black"] = 1] = "Black";
})(Color || (Color = {}));
var RB_Node = /** @class */ (function (_super) {
    __extends(RB_Node, _super);
    function RB_Node(c, k, x, y, z) {
        if (x === void 0) { x = null; }
        if (y === void 0) { y = null; }
        if (z === void 0) { z = null; }
        var _this = _super.call(this, k, x, y, z) || this;
        _this.color = c;
        return _this;
    }
    return RB_Node;
}(BST_1.Node));
var RBT = /** @class */ (function (_super) {
    __extends(RBT, _super);
    function RBT() {
        var _this = _super.call(this) || this;
        _this.nil = new RB_Node(Color.Black, 0, null, null, null);
        _this.root = _this.nil;
        _this.flag = _this.nil;
        return _this;
    }
    RBT.prototype.create = function (a) {
        this.random_insert(a.concat());
        return this.root;
    };
    RBT.prototype.random_insert = function (a) {
        var l = a.length;
        if (l !== 0) {
            var i = Math.floor(Math.random() * l);
            var node = new RB_Node(Color.Red, a.splice(i, 1)[0], this.nil, this.nil, this.nil);
            this.insert(node);
            this.random_insert(a);
        }
    };
    RBT.prototype.insert = function (z) {
        var y = this.nil;
        var x = this.root;
        while (x !== this.nil) {
            y = x;
            if (z.key < x.key) {
                x = x.left;
            }
            else {
                x = x.right;
            }
        }
        z.parent = y;
        if (y === this.nil) {
            this.root = z;
        }
        else if (z.key < y.key) {
            y.left = z;
        }
        else {
            y.right = z;
        }
        z.left = this.nil;
        z.right = this.nil;
        this.insert_fixup(z);
    };
    RBT.prototype.insert_fixup = function (z) {
        while (z.parent.color === Color.Red) {
            if (z.parent === z.parent.parent.left) {
                var y = z.parent.parent.right;
                if (y.color === Color.Red) {
                    z.parent.color = Color.Black;
                    y.color = Color.Black;
                    z.parent.parent.color = Color.Red;
                    z = z.parent.parent;
                }
                else {
                    if (z === z.parent.right) {
                        z = z.parent;
                        this.left_rotate(z);
                    }
                    z.parent.color = Color.Black;
                    z.parent.parent.color = Color.Red;
                    this.right_rotate(z.parent.parent);
                }
            }
            else {
                var y = z.parent.parent.left;
                if (y.color === Color.Red) {
                    z.parent.color = Color.Black;
                    y.color = Color.Black;
                    z.parent.parent.color = Color.Red;
                    z = z.parent.parent;
                }
                else {
                    if (z === z.parent.left) {
                        z = z.parent;
                        this.right_rotate(z);
                    }
                    z.parent.color = Color.Black;
                    z.parent.parent.color = Color.Red;
                    this.left_rotate(z.parent.parent);
                }
            }
        }
        this.root.color = Color.Black;
    };
    RBT.prototype.left_rotate = function (x) {
        var y = x.right;
        x.right = y.left;
        if (y.left !== this.nil) {
            y.left.parent = x;
        }
        y.parent = x.parent;
        if (x.parent === this.nil) {
            this.root = y;
        }
        else if (x === x.parent.left) {
            x.parent.left = y;
        }
        else {
            x.parent.right = y;
        }
        y.left = x;
        x.parent = y;
    };
    RBT.prototype.right_rotate = function (x) {
        var y = x.left;
        x.left = y.right;
        if (y.right !== this.nil) {
            y.right.parent = x;
        }
        y.parent = x.parent;
        if (x.parent === this.nil) {
            this.root = y;
        }
        else if (x === x.parent.left) {
            x.parent.left = y;
        }
        else {
            x.parent.right = y;
        }
        y.right = x;
        x.parent = y;
    };
    return RBT;
}(BST_1.BST));
//test
var tree = new RBT();
var root = tree.create([1, 2, 3, 4]);
console.log(root);
tree.inorder_traverse(console.log);
console.log("!");
