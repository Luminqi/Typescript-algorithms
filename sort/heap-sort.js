"use strict";
exports.__esModule = true;
var max_heap_1 = require("../heap/max-heap");
function heapSort(a) {
    var h = new max_heap_1.maxHeap(a);
    for (var i = h.heap.length - 1; i >= 1; i--) {
        h.swap(0, i);
        h.removeLastNode();
        h.maxHeapify(0);
    }
    return h.heap;
}
exports.heapSort = heapSort;

//test
let a = [4,1,3,2,16,9,10,14,8,7];
let s = heapSort(a);
console.log(s);
console.log("!");