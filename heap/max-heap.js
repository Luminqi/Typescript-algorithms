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
var min_heap_1 = require("./min-heap");
var maxHeap = /** @class */ (function (_super) {
    __extends(maxHeap, _super);
    function maxHeap(a) {
        return _super.call(this, a) || this;
    }
    maxHeap.prototype.maxHeapify = function (i) {
        var l = this.left(i), r = this.right(i), largest = i;
        if (l <= this.heapSize - 1 && this.heap[l] > this.heap[i]) {
            largest = l;
        }
        if (r <= this.heapSize - 1 && this.heap[r] > this.heap[largest]) {
            largest = r;
        }
        if (largest != i) {
            this.swap(i, largest);
            this.maxHeapify(largest);
        }
    };
    maxHeap.prototype.bulidHeap = function () {
        for (var i = Math.floor(this.heap.length / 2) - 1; i >= 0; i--) {
            this.maxHeapify(i);
        }
    };
    return maxHeap;
}(min_heap_1.minHeap));
exports.maxHeap = maxHeap;
