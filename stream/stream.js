function cons_stream(a, b) {
    return [a, memo_proc(b)];
}
function stream_car(a) {
    return a[0];
}
function stream_cdr(a) {
    return force(a[1]);
}
function force(a) {
    return a();
}
function memo_proc(f) {
    var memo;
    return function () {
        if (memo === undefined) {
            memo = f();
        }
        return memo;
    };
}
function stream_filter(pred, s) {
    if (s.length === 0) {
        return [];
    }
    else if (pred(stream_car(s))) {
        return cons_stream(stream_car(s), function () { return stream_filter(pred, stream_cdr(s)); });
    }
    else {
        return stream_filter(pred, stream_cdr(s));
    }
}
function stream_enumerate_interval(low, high) {
    if (low > high) {
        return [];
    }
    else {
        return cons_stream(low, function () { return stream_enumerate_interval(low + 1, high); });
    }
}
function find_second_prime(low, high) {
    return stream_car(stream_cdr(stream_filter(isPrime, stream_enumerate_interval(low, high))));
}
function isPrime(n) {
    return n === smallest_divisor(n);
}
function smallest_divisor(n) {
    return find_divisor(n, 2);
}
function find_divisor(n, test_divisor) {
    if (test_divisor * test_divisor > n) {
        return n;
    }
    else if (divides(test_divisor, n)) {
        return test_divisor;
    }
    else {
        return find_divisor(n, test_divisor + 1);
    }
}
function divides(a, b) {
    return b % a === 0;
}


//test
console.log(stream_enumerate_interval(10, 20))
console.log(stream_filter(isPrime, stream_enumerate_interval(10, 20)))
console.log(find_second_prime(10000, 1000000))
console.log("!")