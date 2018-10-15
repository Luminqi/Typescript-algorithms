function _randomized_quicksort(a, p, q) {
    if (p < q) {
        var k = Math.floor(Math.random() * (q - p + 1) + p);
        var n = a[p];
        a[p] = a[k];
        a[k] = n;
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
        _randomized_quicksort(a, p, i - 1);
        _randomized_quicksort(a, i + 1, q);
    }
}
function randomized_quicksort(a) {
    var q = a.length - 1;
    var copy = a.concat();
    _randomized_quicksort(copy, 0, q);
    return copy;
}

var a = [5, 10, 15, 2, 1, 4, 7, 3, 3, 8, 9, 6, 5, 11];
let r = randomized_quicksort(a);
console.log(r);