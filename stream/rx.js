var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Observable = /** @class */ (function () {
    function Observable(subscribe) {
        if (subscribe) {
            this._subscribe = subscribe;
        }
    }
    Observable.prototype.lift = function (operator) {
        // yeild a child Observable which source points to current Observable
        var observable = new Observable();
        observable.source = this;
        observable.operator = operator;
        return observable;
    };
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
    Observable.prototype.subscribe = function (next, error, complete) {
        var operator = this.operator;
        var subscriber = toSubscriber(next, error, complete);
        if (operator) {
            operator.call(subscriber, this.source);
        }
        else {
            this._subscribe(subscriber);
        }
        return subscriber;
    };
    Observable.prototype.pipe = function () {
        var operations = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            operations[_i] = arguments[_i];
        }
        if (operations.length === 0) {
            return this;
        }
        return pipeFromArray(operations)(this);
    };
    return Observable;
}());
function toSubscriber(next, error, complete) {
    if (next) {
        if (next instanceof Subscriber) {
            return next;
        }
    }
    if (!next && !error && !complete) {
        return new Subscriber(emptyObserver);
    }
    return new Subscriber(next, error, complete);
}
function pipeFromArray(fns) {
    if (!fns) {
        return noop;
    }
    if (fns.length === 1) {
        return fns[0];
    }
    return function piped(input) {
        return fns.reduce(function (prev, fn) { return fn(prev); }, input);
    };
}
function noop() { }
var Subscription = /** @class */ (function () {
    function Subscription(unsubscribe) {
        this.closed = false;
        if (unsubscribe) {
            this._unsubscribe = unsubscribe;
        }
    }
    Subscription.prototype.unsubscribe = function () {
        if (this.closed) {
            return;
        }
        this.closed = true;
        if (this._unsubscribe) {
          this._unsubscribe();
        }  
    };
    return Subscription;
}());
var emptyObserver = {
    closed: true,
    next: function (value) { },
    error: function (err) { },
    complete: function () { }
};
var Subscriber = /** @class */ (function (_super) {
    __extends(Subscriber, _super);
    function Subscriber(next, error, complete) {
        var _this = _super.call(this) || this;
        _this.isStopped = false;
        switch (arguments.length) {
            case 0:
                _this.destination = emptyObserver;
                break;
            case 1:
                if (!next) {
                    _this.destination = emptyObserver;
                    break;
                }
                if (typeof next === 'object') {
                    if (next instanceof Subscriber) {
                        _this.destination = next; // internal operator subscriber
                    }
                    else {
                        _this.destination = new SafeSubscriber(_this, next);
                    }
                    break;
                }
            default:
                _this.destination = new SafeSubscriber(_this, next, error, complete);
                break;
        }
        return _this;
    }
    Subscriber.prototype.next = function (value) {
        if (!this.isStopped) {
            this._next(value);
        }
    };
    Subscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            this.isStopped = true;
            this._error(err);
        }
    };
    Subscriber.prototype.complete = function () {
        if (!this.isStopped) {
            this.isStopped = true;
            this._complete();
        }
    };
    Subscriber.prototype.unsubscribe = function () {
        if (this.closed) {
            return;
        }
        this.isStopped = true;
        _super.prototype.unsubscribe.call(this);
    };
    Subscriber.prototype._next = function (value) {
        this.destination.next(value);
    };
    Subscriber.prototype._error = function (err) {
        this.destination.error(err);
        this.unsubscribe();
    };
    Subscriber.prototype._complete = function () {
        this.destination.complete();
        this.unsubscribe();
    };
    return Subscriber;
}(Subscription));
var SafeSubscriber = /** @class */ (function (_super) {
    __extends(SafeSubscriber, _super);
    function SafeSubscriber(_parentSubscriber, observerOrNext, error, compelte) {
        var _this = _super.call(this) //set destination as emptyObserver
         || this;
        _this._parentSubscriber = _parentSubscriber;
        var next;
        if (typeof observerOrNext === 'function') {
            next = observerOrNext;
        }
        else if (observerOrNext) {
            next = observerOrNext.next;
            error = observerOrNext.error;
            compelte = observerOrNext.compelte;
        }
        _this._next = next;
        _this._error = error;
        _this._complete = compelte;
        return _this;
    }
    SafeSubscriber.prototype.next = function (value) {
        if (!this.isStopped && this._next) {
            this._tryOrUnsub(this._next, value);
        }
    };
    SafeSubscriber.prototype.error = function (err) {
        if (!this.isStopped && this._error) {
            this._tryOrUnsub(this._error, err);
        }
        _super.prototype.unsubscribe.call(this);
    };
    SafeSubscriber.prototype.complete = function () {
        if (!this.isStopped && this._complete) {
            this._tryOrUnsub(this._complete);
        }
        _super.prototype.unsubscribe.call(this);
    };
    SafeSubscriber.prototype._tryOrUnsub = function (f, value) {
        try {
            f.call(this, value);
        }
        catch (err) {
            _super.prototype.unsubscribe.call(this);
            throw err;
        }
    };
    return SafeSubscriber;
}(Subscriber));
function range(start, count) {
    return new Observable(function (subscriber) {
        var index = 0;
        var current = start;
        do {
            if (index++ >= count) {
                subscriber.complete();
                break;
            }
            subscriber.next(current++);
            if (subscriber.closed) {
                break;
            }
        } while (true);
        return undefined;
    });
}
function take(count) {
    return function (source) {
        if (count === 0) {
            return new Observable(function (subscriber) { return subscriber.complete(); });
        }
        else {
            // new observable whose source is parent observable, operator is TakeOperator
            return source.lift(new TakeOperator(count));
        }
    };
}
var TakeOperator = /** @class */ (function () {
    function TakeOperator(total) {
        this.total = total;
        if (this.total < 0) {
            throw new Error("argument of take operator is out of range");
        }
    }
    TakeOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new TakeSubscriber(subscriber, this.total));
    };
    return TakeOperator;
}());
var TakeSubscriber = /** @class */ (function (_super) {
    __extends(TakeSubscriber, _super);
    function TakeSubscriber(destination, total) {
        var _this = _super.call(this, destination) // set the Subscriber as the destination
         || this;
        _this.total = total;
        _this.count = 0;
        return _this;
    }
    TakeSubscriber.prototype._next = function (value) {
        var total = this.total;
        var count = ++this.count;
        if (count <= total) {
            this.destination.next(value);
            if (count === total) {
                this.destination.complete();
                this.unsubscribe();
            }
        }
    };
    return TakeSubscriber;
}(Subscriber));
function filter(predicate, thisArg) {
    return function filterOperatorFunction(source) {
        return source.lift(new FilterOperator(predicate, thisArg));
    };
}
var FilterOperator = /** @class */ (function () {
    function FilterOperator(predicate, thisArg) {
        this.predicate = predicate;
        this.thisArg = thisArg;
    }
    FilterOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new FilterSubscriber(subscriber, this.predicate, this.thisArg));
    };
    return FilterOperator;
}());
var FilterSubscriber = /** @class */ (function (_super) {
    __extends(FilterSubscriber, _super);
    function FilterSubscriber(destination, predicate, thisArg) {
        var _this = _super.call(this, destination) || this;
        _this.predicate = predicate;
        _this.thisArg = thisArg;
        _this.count = 0;
        return _this;
    }
    FilterSubscriber.prototype._next = function (value) {
        var result;
        try {
            result = this.predicate.call(this.thisArg, value, this.count++);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        if (result) {
            this.destination.next(value);
        }
    };
    return FilterSubscriber;
}(Subscriber));



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
function even (n) {
    return n % 2 === 0
}
console.log(isPrime(7))
range(1, 100).pipe(filter(even), take(10)).subscribe(v => console.log(v))
console.log("!")