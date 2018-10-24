export class minHeap {
  heap: number[]
  heapSize: number

  constructor (a: number[]) {
    this.heap = a.concat()
    this.heapSize = this.heap.length
    this.bulidHeap()
  }

  protected parent (childIndex: number) {
    return Math.floor((childIndex - 1) / 2)
  }

  protected left (parentIndex: number) {
    return 2 * parentIndex + 1
  }

  protected right (parentIndex: number) {
    return 2 * parentIndex + 2
  }

  swap (index1: number, index2: number) {
    const tmp = this.heap[index1]
    this.heap[index1] = this.heap[index2]
    this.heap[index2] = tmp 
  }

  minHeapify (i: number) {
    let l = this.left(i),
        r = this.right(i),
        smallest = i
    if (l <= this.heapSize - 1 && this.heap[l] < this.heap[i]) {
      smallest = l
    }
    if (r <= this.heapSize - 1 && this.heap[r] < this.heap[smallest]) {
      smallest = r
    }
    if (smallest != i) {
      this.swap(i, smallest)
      this.minHeapify(smallest)
    }
  }

  bulidHeap () {
    for (let i = Math.floor(this.heap.length  / 2) - 1; i >= 0; i--) {
      this.minHeapify(i)
    }
  }

  removeLastNode () {
    this.heapSize = this.heapSize - 1
  }

  getHeap () {
    return this.heap.slice(0, this.heapSize)
  }
}

