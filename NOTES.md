# Part C: Event-loop ordering lab

## Predicted order (retrospective)

1. 1 sync start
2. 2 sync inside async fn (before first await)
3. 2b sync end
4. 3 nextTick
5. 4 microtask: promise.then
6. 5 microtask: queueMicrotask
7. 5b microtask: after await
8. 6 macrotask: setTimeout 0
9. 7 macrotask: setImmediate

## Actual order

1. 1 sync start
2. 2 sync inside async fn (before first await)
3. 2b sync end
4. 4 microtask: promise.then
5. 5 microtask: queueMicrotask
6. 5b microtask: after await
7. 3 nextTick
8. 7 macrotask: setImmediate
9. 6 macrotask: setTimeout 0

## Explanation

The actual order differs from the retrospective prediction because this file uses ES modules. In Node.js, the Promise microtasks run before the `process.nextTick()` callback during ES module evaluation. The order of `setImmediate()` and `setTimeout(..., 0)` can also vary when scheduled from the main module.