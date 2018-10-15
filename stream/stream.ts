type delayedStream = () => stream 
type stream = (number | delayedStream)[]
function cons_stream (a: number, b: () => stream) {
  return [a, memo_proc(b)]
}
function stream_car (a: stream) {
  return <number>a[0]
}
function stream_cdr (a: stream) {
  return force(<delayedStream>a[1])
}
function force (a: delayedStream) {
  return a()
}
function memo_proc (f: () => stream) {
  let memo: stream
  return function () {
    if (memo === undefined) {
      memo = f()
    }
    return memo
  }
}
function stream_filter (pred: (m: number) => boolean, s: stream): stream {
  if (s.length === 0) {
    return []
  } else if (pred(stream_car(s))) {
    return cons_stream(stream_car(s), () => stream_filter(pred, stream_cdr(s)))
  } else {
    return stream_filter(pred, stream_cdr(s))
  }
}


function stream_enumerate_interval (low: number, high: number): stream {
  if (low > high) {
    return []
  } else {
    return cons_stream(low, () => stream_enumerate_interval(low + 1, high))
  }
}


function find_second_prime (low: number, high: number): number {
  return stream_car(
    stream_cdr(
      stream_filter(
        isPrime,
        stream_enumerate_interval(low, high)
      )      
    )
  )
}


function isPrime (n: number) {
  return n === smallest_divisor(n)
}

function smallest_divisor (n: number) {
  return find_divisor(n, 2)
}

function find_divisor (n: number, test_divisor: number) {
  if (test_divisor * test_divisor > n) {
    return n
  } else if (divides(test_divisor, n)) {
    return test_divisor
  } else {
    return find_divisor(n, test_divisor + 1)
  }
}

function divides (a: number, b: number) {
  return  b % a === 0
}