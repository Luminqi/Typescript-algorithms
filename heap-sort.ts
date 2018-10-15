function _parent (i: number) {
  return Math.floor(i / 2);
}
function _left(i: number) {
  return 2*i;
}
function _right(i: number) {
  return 2*i + 1;
}
function _maxheapify (a: number[], i: number, heap_size: number) {
  let l = _left(i),
      r = _right(i),
      largest = i;
  if (l <= heap_size && a[l-1] > a[largest-1]) {
    largest = l;
  }
  if (r <= heap_size && a[r-1] > a[largest-1]) {
    largest = r;
  }
  if (largest !== i) {
    let m = a[i-1];
    a[i-1] = a[largest-1];
    a[largest-1] = m;
    _maxheapify(a, largest, heap_size);
  }
}

function _buildmaxheap (a: number[]) {
  let heap_size = a.length;
  for (let i = Math.floor(heap_size / 2); i >= 1; i --) {
    _maxheapify(a, i, heap_size);
  }
}

function heap_sort (a: number[]) {
  let copy = a.concat(),
      heap_size = copy.length;
  _buildmaxheap(copy);
  for (let i = heap_size; i >= 2; i --) {
    let m = copy[0];
    copy[0] = copy[i-1];
    copy[i-1] = m;
    heap_size = heap_size -1;
    _maxheapify(copy, 1, heap_size);
  }
  return copy;
}