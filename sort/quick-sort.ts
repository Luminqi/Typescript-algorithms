function _quicksort (a: Array<number>, p: number, q: number) {
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
    _quicksort(a, p, i - 1);
    _quicksort(a, i + 1, q);
  }
}

function quicksort (a: number[]) {
  let q = a.length - 1;
  let copy = a.concat();
  _quicksort(copy, 0, q);
  return copy;
}

//test
let a = [5, 10, 15, 2, 1, 4, 7, 3, 3, 8, 9, 6, 5, 11] 
quicksort(a);
