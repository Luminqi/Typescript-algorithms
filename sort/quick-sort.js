function _quicksort(a, p, q) {
    if (p < q) {
        var x = a[p]; // pivot
        var i = p;
        for (var j = p + 1; j <= q; j++) {
            if (a[j] <= x) {
                i = i + 1;
                var m_1 = a[i];
                a[i] = a[j];
                a[j] = m_1;
            }
        }
        var m = a[i];
        a[i] = a[p];
        a[p] = m;
        _quicksort(a, p, i - 1);
        _quicksort(a, i + 1, q);
    }
}
function quicksort(a) {
    var q = a.length - 1;
    var copy = a.concat();
    _quicksort(copy, 0, q);
    return copy;
}
//test
var a = [5, 10, 15, 2, 1, 4, 7, 3, 3, 8, 9, 6, 5, 11];
let r = quicksort(a);
console.log(r);


