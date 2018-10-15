function _randomized_quicksort (a: Array<number>, p: number, q: number) {
  if (p < q) {
    let k = Math.floor(Math.random() * (q - p + 1) + p);
    let n = a[p];
    a[p] = a[k];
    a[k] = n;
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
    _randomized_quicksort(a, p, i - 1);
    _randomized_quicksort(a, i + 1, q);
  }
}

function randomized_quicksort (a: number[]) {
  let q = a.length - 1;
  let copy = a.concat();
  _randomized_quicksort(copy, 0, q);
  return copy;
}