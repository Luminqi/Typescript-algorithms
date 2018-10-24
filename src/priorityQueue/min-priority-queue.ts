import { minHeap } from '../heap/min-heap'
export class minPriorityQueue extends minHeap {
  constructor (a: number[]) {
    super(a)
  }
  minimum () {
    return this.heap[0]
  }
  extractMin () {
    if (this.heapSize < 1) {
      throw new Error("heap underflow")
    }
    const min = this.heap[0]
    this.heap[0] = this.heap[this.heapSize - 1]
    this.removeLastNode()
    this.minHeapify(0)
    return min
  }
  decreaseKey (i: number, key: number) {
    if (key > this.heap[i]) {
      throw new Error("new key is bigger than current key")
    }
    while (i > 0 && this.heap[this.parent(i)] > key) {
      this.heap[i] = this.heap[this.parent(i)]
      i = this.parent(i)
    }
    this.heap[i] = key
  }
  heapInsert (key: number) {
    this.heapSize = this.heapSize + 1
    this.heap[this.heapSize - 1] = Infinity
    this.decreaseKey(this.heapSize - 1, key)
  }
  heapDelete (i: number) {
    if (i > this.heapSize - 1) {
      throw new Error("the node i is not in heap")
    }
    this.heap[i] = this.heap[this.heapSize - 1]
    this.heapSize = this.heapSize - 1;
    this.minHeapify(i)
  }
} 