import { maxHeap } from '../heap/max-heap'
export class maxPriorityQueue extends maxHeap {
  constructor (a: number[]) {
    super(a)
  }
  maximum () {
    return this.heap[0]
  }
  extractMax () {
    if (this.heapSize < 1) {
      throw new Error("heap underflow")
    }
    const max = this.heap[0]
    this.heap[0] = this.heap[this.heapSize - 1]
    this.removeLastNode()
    this.maxHeapify(0)
    return max
  }
  increaseKey (i: number, key: number) {
    if (key < this.heap[i]) {
      throw new Error("new key is smaller than current key")
    }
    while (i > 0 && this.heap[this.parent(i)] < key) {
      this.heap[i] = this.heap[this.parent(i)]
      i = this.parent(i)
    }
    this.heap[i] = key
  }
  heapInsert (key: number) {
    this.heapSize = this.heapSize + 1
    this.heap[this.heapSize - 1] = -Infinity
    this.increaseKey(this.heapSize - 1, key)
  }
  heapDelete (i: number) {
    if (i > this.heapSize - 1) {
      throw new Error("the node i is not in heap")
    }
    this.heap[i] = this.heap[this.heapSize - 1]
    this.heapSize = this.heapSize - 1;
    this.maxHeapify(i)
  }
} 