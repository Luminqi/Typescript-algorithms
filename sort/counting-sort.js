function counting_sort(a, k) {
    var l = a.length, b = new Array(l), c = new Array(k + 1); //0 to k
    for (var i = 0; i <= k; i++) {
        c[i] = 0;
    }
    for (var i = 0; i <= l - 1; i++) {
        c[a[i]] = c[a[i]] + 1;
    }
    for (var i = 1; i <= k; i++) {
        c[i] = c[i] + c[i - 1];
    }
    for (var i = l - 1; i >= 0; i--) {
        b[c[a[i]]] = a[i];
        c[a[i]] = c[a[i]] - 1;
    }
    return b;
}

//test
var a = [5, 10, 15, 2, 1, 4, 7, 3, 3, 8, 9, 6, 5, 11];
let r = counting_sort(a, 15);
console.log(r);