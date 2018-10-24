import { minHeap } from './min-heap'

export class maxHeap extends minHeap {
  constructor (a: number[]) {
    super(a)
  }
  maxHeapify (i: number) {
    let l = this.left(i),
        r = this.right(i),
        largest = i
    if (l <= this.heapSize - 1 && this.heap[l] > this.heap[i]) {
      largest = l
    }
    if (r <= this.heapSize - 1 && this.heap[r] > this.heap[largest]) {
      largest = r
    }
    if (largest != i) {
      this.swap(i, largest)
      this.maxHeapify(largest)
    }
  }

  bulidHeap () {
    for (let i = Math.floor(this.heap.length  / 2) - 1; i >= 0; i--) {
      this.maxHeapify(i)
    }
  }
}