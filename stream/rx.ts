class Observable {
  source: Observable
  operator
  constructor (subscribe?) {
    if (subscribe) {
      (<any>this)._subscribe = subscribe
    }
  }
  lift (operator) {
    // yeild a child Observable which source points to current Observable
    const observable = new Observable()
    observable.source = this 
    observable.operator = operator
    return observable
  }
  /* subscribe will call *multiple times*. First time will called with the user defined observer.
   * Thus create a safeSubscriber.
   * 
   * If the operator exists, invoke operator's call method with this safeSubscriber and
   * the parent Observable. In operator's call method, the parent Observable will
   * call its subscribe with the new operator subscriber(in it's code, invoke the safeSubscriber's
   * next method by setting the safeSubscriber as the destination, but in the operator's manner).
   * 
   * If the parent Observable still has operator, invoke operator's call method with the old
   * operator subscriber and the grandparent source. Same as before, grandparent source will
   * call its subscribe with the new operator subscriber which sets the old operator subscriber 
   * as it's destination.
   * 
   * If there is no operator, thus reaching the root operator, call the _subscribe method
   * (provided by the internal observable create operators) with the final subscriber
   * 
   *   
  */

  subscribe (next?, error?, complete?) { //will call multiple times
    const { operator } = this
    const subscriber = toSubscriber(next, error, complete)
    if (operator) {
      operator.call(subscriber, this.source)
    } else {
      (<any>this)._subscribe(subscriber)
    }
    return subscriber
  }

  pipe (...operations) {
    if (operations.length === 0) {
      return this
    }
    return pipeFromArray(operations)(this)
  }
}

function toSubscriber (next?, error?, complete?) {
  if (next) {
    if (next instanceof Subscriber) {
      return next
    }
  }
  if (!next && !error && !complete) {
    return new Subscriber(emptyObserver)
  }
  return new Subscriber(next, error, complete)
}

function pipeFromArray (fns) {
  if (!fns) {
    return noop
  }
  if (fns.length === 1) {
    return fns[0]
  }
  return function piped(input) {
    return fns.reduce((prev, fn) => fn(prev), input)
  }
}

function noop () {}

class Subscription {
  closed: boolean = false
  constructor (unsubscribe?: () => void ) {
    if (unsubscribe) {
      (<any>this)._unsubscribe = unsubscribe
    }
  }
  unsubscribe () {
    if (this.closed) {
      return
    }
    this.closed = true
    if ((<any>this)._unsubscribe) {
      (<any>this)._unsubscribe()
    }
  }
}

const emptyObserver = {
  closed: true,
  next(value: any): void { /* noop */ },
  error(err: any): void { /* noop */ },
  complete(): void { /*noop*/ }
}

class Subscriber extends Subscription{
  isStopped: boolean = false
  destination
  constructor (next?, error?, complete?) {
    super()
    switch (arguments.length) {
      case 0: 
        this.destination = emptyObserver
        break
      case 1:
        if(!next) {
          this.destination = emptyObserver
          break
        }
        if (typeof next === 'object') {
          if (next instanceof Subscriber) {
            this.destination = next // internal operator subscriber
          } else {
            this.destination = new SafeSubscriber(this, next) // user defined observer object
          }
          break
        }
      default: 
        this.destination = new SafeSubscriber(this, next, error, complete)
        break
    }
  }
  next (value) {
    if (!this.isStopped) {
      this._next(value)
    }
  }
  error (err) {
    if (!this.isStopped) {
      this.isStopped = true
      this._error(err)
    }
  }
  complete () {
    if (!this.isStopped) {
      this.isStopped = true
      this._complete()
    }
  }
  unsubscribe () {
    if (this.closed) {
      return
    }
    this.isStopped = true
    super.unsubscribe()
  }
  protected _next(value): void {
    this.destination.next(value);
  }

  protected _error(err): void {
    this.destination.error(err);
    this.unsubscribe();
  }

  protected _complete(): void {
    this.destination.complete();
    this.unsubscribe();
  }
}

class SafeSubscriber extends Subscriber {
  constructor (private _parentSubscriber: Subscriber,
               observerOrNext?,
               error?,
               compelte?) {
    super() //set destination as emptyObserver
    let next
    if (typeof observerOrNext === 'function') {
      next = observerOrNext
    } else if (observerOrNext) {
      next = observerOrNext.next
      error = observerOrNext.error
      compelte = observerOrNext.compelte
    }
    this._next = next
    this._error = error
    this._complete = compelte
  }
  next (value) {
    if (!this.isStopped && this._next) {
      this._tryOrUnsub(this._next, value)
    }
  }
  error (err) {
    if (!this.isStopped && this._error) {
      this._tryOrUnsub(this._error, err)
    }
    super.unsubscribe()
  }
  complete () {
    if (!this.isStopped && this._complete) {
      this._tryOrUnsub(this._complete)
    }
    super.unsubscribe()
  }
  private _tryOrUnsub (f, value?) {
    try {
      f.call(this, value)
    } catch (err) {
      super.unsubscribe()
      throw err
    }
  }
}

function range (start: number, count: number) {
  return new Observable(subscriber => {
    let index = 0
    let current = start
    do {
      if (index++ >= count) {
        subscriber.complete()
        break
      }
      subscriber.next(current++)
      if (subscriber.closed) {
        break
      }
    } while(true)
    return undefined
  })
}

function take (count: number) {
  return (source) => {
    if (count === 0) {
      return new Observable(subscriber => subscriber.complete())
    } else {
      // new observable whose source is parent observable, operator is TakeOperator
      return source.lift(new TakeOperator(count))
    }
  }
}

class TakeOperator {
  constructor (private total: number) {
    if (this.total < 0) {
      throw new Error("argument of take operator is out of range")
    }
  }
  
  call (subscriber: Subscriber, source: Observable) {
    return source.subscribe(new TakeSubscriber(subscriber, this.total))
  }
}

class TakeSubscriber extends Subscriber {
  private count: number = 0
  constructor (destination: Subscriber, private total: number) {
    super(destination) // set the Subscriber as the destination
  }
  protected _next (value) { //change the previous Subscriber behaviour
    const total = this.total
    const count = ++this.count
    if (count <= total) {
      this.destination.next(value);
      if (count === total) {
        this.destination.complete()
        this.unsubscribe()
      }
    }
  }
}

function filter (predicate: (value: any, index: number) => boolean,
                 thisArg?: any) {
  return function filterOperatorFunction (source: Observable): Observable {
    return source.lift(new FilterOperator(predicate, thisArg))
  }
}

class FilterOperator {
  constructor (private predicate: (value: any, index: number) => boolean,
               private thisArg?: any) {
  }
  call (subscriber: Subscriber, source: any) {
    return source.subscribe(new FilterSubscriber(subscriber, this.predicate, this.thisArg))
  }
}

class FilterSubscriber extends Subscriber {
  count: number = 0
  constructor(destination: Subscriber,
              private predicate,
              private thisArg) {
  super(destination)
  }
  protected _next(value) {
    let result: any;
    try {
      result = this.predicate.call(this.thisArg, value, this.count++)
    } catch (err) {
      this.destination.error(err)
      return
    }
    if (result) {
      this.destination.next(value)
    }
  }
}