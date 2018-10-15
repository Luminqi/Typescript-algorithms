"use strict";
exports.__esModule = true;
var minHeap = /** @class */ (function () {
    function minHeap(a) {
        this.heap = a.concat();
        this.heapSize = this.heap.length;
        this.bulidHeap();
    }
    minHeap.prototype.parent = function (childIndex) {
        return Math.floor((childIndex - 1) / 2);
    };
    minHeap.prototype.left = function (parentIndex) {
        return 2 * parentIndex + 1;
    };
    minHeap.prototype.right = function (parentIndex) {
        return 2 * parentIndex + 2;
    };
    minHeap.prototype.swap = function (index1, index2) {
        var tmp = this.heap[index1];
        this.heap[index1] = this.heap[index2];
        this.heap[index2] = tmp;
    };
    minHeap.prototype.minHeapify = function (i) {
        var l = this.left(i), r = this.right(i), smallest = i;
        if (l <= this.heapSize - 1 && this.heap[l] < this.heap[i]) {
            smallest = l;
        }
        if (r <= this.heapSize - 1 && this.heap[r] < this.heap[smallest]) {
            smallest = r;
        }
        if (smallest != i) {
            this.swap(i, smallest);
            this.minHeapify(smallest);
        }
    };
    minHeap.prototype.bulidHeap = function () {
        for (var i = Math.floor(this.heap.length / 2) - 1; i >= 0; i--) {
            this.minHeapify(i);
        }
    };
    minHeap.prototype.removeLastNode = function () {
        this.heapSize = this.heapSize - 1;
    };
    minHeap.prototype.getHeap = function () {
        return this.heap.slice(0, this.heapSize);
    };
    return minHeap;
}());
exports.minHeap = minHeap;
