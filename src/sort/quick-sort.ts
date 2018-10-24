function _quickSort (a: Array<number>, p: number, q: number) {
  if (p < q) {
    let x = a[p]; // pivot
    let i = p;
    for (let j = p + 1; j <= q; j ++) {
      if (a[j] <= x) {
        i = i + 1;
        let m = a[i];
        a[i] = a[j]
        a[j] = m;   
      }
    }
    let m = a[i];
    a[i] = a[p];
    a[p] = m;
    _quickSort(a, p, i - 1);
    _quickSort(a, i + 1, q);
  }
}

export function quickSort (a: number[]) {
  let q = a.length - 1;
  let copy = a.concat();
  _quickSort(copy, 0, q);
  return copy;
}

