import { maxHeap } from "../heap/max-heap"
export function heapSort (a: number[]) {
  const h = new maxHeap(a)
  for (let i = h.heap.length - 1; i >= 1; i--) {
    h.swap(0, i)
    h.removeLastNode()
    h.maxHeapify(0)
  }
  return h.heap
}
