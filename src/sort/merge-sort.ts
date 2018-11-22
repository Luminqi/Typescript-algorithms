function merge (a: number[], p: number, q: number, r: number) {
  const length1 = q - p + 1
  const length2 = r - q
  let left = []
  let right = []
  for (let i = 0; i < length1; i ++) {
    left.push(a[p + i])
  }
  for (let i = 0; i < length2; i ++) {
    right.push(a[q + i + 1])
  }
  left.push(Infinity)
  right.push(Infinity)
  let i = 0
  let j = 0
  for (let k = p; k <= r; k ++) {
    if (left[i] <= right[j]) {
      a[k] = left[i]
      i = i + 1
    } else {
      a[k] = right[j]
      j = j + 1
    }
  }
}

export function mergeSort (a: number[]) {
  function _mergeSort (a: number[], p: number, r: number) {
    if (p < r) {
      const q = Math.floor((p + r) / 2)
      _mergeSort(a, p, q)
      _mergeSort(a, q + 1, r)
      merge(a, p, q, r)
    }
  }
  const length = a.length
  _mergeSort(a, 0, length - 1)
  return a
}