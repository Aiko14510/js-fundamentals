import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeCounter, memoize } from '../src/closures.js';

test('makeCounter increments and decrements', () => {
  const counter = makeCounter(5);

  assert.equal(counter.value, 5);
  assert.equal(counter.inc(), 6);
  assert.equal(counter.dec(), 5);
  assert.equal(counter.value, 5);
});

test('memoize caches function results', () => {
  let calls = 0;

  const double = memoize((n) => {
    calls++;
    return n * 2;
  });

  assert.equal(double(4), 8);
  assert.equal(double(4), 8);
  assert.equal(double(5), 10);
  assert.equal(calls, 2);
});