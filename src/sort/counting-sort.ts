export function countingSort (a: number[], k: number) {
  let l = a.length,
    b = [], 
    c = [];
  for (let i = 0; i <= k; i ++) {
    c[i] = 0;
  }
  for (let i = 0; i <= l - 1; i ++) {
    c[a[i]] = c[a[i]] + 1;
  }
  for (let i = 1; i <= k; i ++) {
    c[i] = c[i] + c[i - 1];
  }
  for (let i = l - 1; i >= 0; i --) {
    b[c[a[i]] - 1] = a[i];
    c[a[i]] = c[a[i]] - 1;  
  }
  return b;
}
