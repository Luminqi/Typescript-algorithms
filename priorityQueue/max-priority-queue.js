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
var max_heap_1 = require("../heap/max-heap");
var maxPriorityQueue = /** @class */ (function (_super) {
    __extends(maxPriorityQueue, _super);
    function maxPriorityQueue(a) {
        return _super.call(this, a) || this;
    }
    maxPriorityQueue.prototype.maximum = function () {
        return this.heap[0];
    };
    maxPriorityQueue.prototype.extractMax = function () {
        if (this.heapSize < 1) {
            throw new Error("heap underflow");
        }
        var max = this.heap[0];
        this.heap[0] = this.heap[this.heapSize - 1];
        this.removeLastNode();
        this.maxHeapify(0);
        return max;
    };
    maxPriorityQueue.prototype.increaseKey = function (i, key) {
        if (key < this.heap[i]) {
            throw new Error("new key is smaller than current key");
        }
        while (i > 0 && this.heap[this.parent(i)] < key) {
            this.heap[i] = this.heap[this.parent(i)];
            i = this.parent(i);
        }
        this.heap[i] = key;
    };
    maxPriorityQueue.prototype.heapInsert = function (key) {
        this.heapSize = this.heapSize + 1;
        this.heap[this.heapSize - 1] = -Infinity;
        this.increaseKey(this.heapSize - 1, key);
    };
    maxPriorityQueue.prototype.heapDelete = function (i) {
        if (i > this.heapSize - 1) {
            throw new Error("the node i is not in heap");
        }
        this.heap[i] = this.heap[this.heapSize - 1];
        this.heapSize = this.heapSize - 1;
        this.maxHeapify(i);
    };
    return maxPriorityQueue;
}(max_heap_1.maxHeap));
exports.maxPriorityQueue = maxPriorityQueue;


//test
let a = [4,1,3,2,16,9,10,14,8,7];
let b = new maxPriorityQueue(a);
// console.log(b.getHeap())
// b.increaseKey(8, 15)
console.log(b.getHeap())
console.log(b.maximum());
console.log(b.extractMax());
console.log(b.getHeap());
b.heapInsert(11);
console.log(b.getHeap());
b.heapDelete(1);
console.log(b.getHeap());
console.log("!");