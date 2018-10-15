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
var min_heap_1 = require("../heap/min-heap");
var minPriorityQueue = /** @class */ (function (_super) {
    __extends(minPriorityQueue, _super);
    function minPriorityQueue(a) {
        return _super.call(this, a) || this;
    }
    minPriorityQueue.prototype.minimum = function () {
        return this.heap[0];
    };
    minPriorityQueue.prototype.extractMin = function () {
        if (this.heapSize < 1) {
            throw new Error("heap underflow");
        }
        var min = this.heap[0];
        this.heap[0] = this.heap[this.heapSize - 1];
        this.removeLastNode();
        this.minHeapify(0);
        return min;
    };
    minPriorityQueue.prototype.decreaseKey = function (i, key) {
        if (key > this.heap[i]) {
            throw new Error("new key is bigger than current key");
        }
        while (i > 0 && this.heap[this.parent(i)] > key) {
            this.heap[i] = this.heap[this.parent(i)];
            i = this.parent(i);
        }
        this.heap[i] = key;
    };
    minPriorityQueue.prototype.heapInsert = function (key) {
        this.heapSize = this.heapSize + 1;
        this.heap[this.heapSize - 1] = Infinity;
        this.decreaseKey(this.heapSize - 1, key);
    };
    minPriorityQueue.prototype.heapDelete = function (i) {
        if (i > this.heapSize - 1) {
            throw new Error("the node i is not in heap");
        }
        this.heap[i] = this.heap[this.heapSize - 1];
        this.heapSize = this.heapSize - 1;
        this.minHeapify(i);
    };
    return minPriorityQueue;
}(min_heap_1.minHeap));
exports.minPriorityQueue = minPriorityQueue;

//test
let a = [4,1,3,2,16,9,10,14,8,7];
let b = new minPriorityQueue(a);
// console.log(b.getHeap())
// b.decreaseKey(8, 6)
console.log(b.getHeap())
console.log(b.minimum());
console.log(b.extractMin());
console.log(b.getHeap());
b.heapInsert(11);
console.log(b.getHeap());
b.heapDelete(1);
console.log(b.getHeap());
console.log("!");