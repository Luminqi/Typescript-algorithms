function _parent(i) {
    return Math.floor(i / 2);
}
function _left(i) {
    return 2 * i;
}
function _right(i) {
    return 2 * i + 1;
}
function _maxheapify(a, i, heap_size) {
    var l = _left(i), r = _right(i), largest = i;
    if (l <= heap_size && a[l-1] > a[largest-1]) {
        largest = l;
    }
    if (r <= heap_size && a[r-1] > a[largest-1]) {
        largest = r;
    }
    if (largest !== i) {
        var m = a[i - 1];
        a[i - 1] = a[largest - 1];
        a[largest - 1] = m;
        _maxheapify(a, largest, heap_size);
    }
}
function _buildmaxheap(a) {
    var heap_size = a.length;
    for (var i = Math.floor(heap_size / 2); i >= 1; i--) {
        _maxheapify(a, i, heap_size);
    }
}
function heap_sort(a) {
    var copy = a.concat(), heap_size = copy.length;
    _buildmaxheap(copy);
    console.log(copy);
    for (var i = heap_size; i >= 2; i--) {
        var m = copy[0];
        copy[0] = copy[i - 1];
        copy[i - 1] = m;
        heap_size = heap_size - 1;
        _maxheapify(copy, 1, heap_size);
    }
    return copy;
}

//test
let a = [4,1,3,2,16,9,10,14,8,7];
let s = heap_sort(a);
console.log(s);