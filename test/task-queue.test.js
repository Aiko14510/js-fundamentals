import { test } from 'node:test';
import assert from 'node:assert/strict';
import { TaskQueue } from '../src/task-queue.js';

test('TaskQueue runs tasks in order and clears its size', async () => {
  const queue = new TaskQueue('my queue');

  queue.push(async () => 'first');
  queue.push(async () => 'second');
  queue.push(async () => 'third');

  assert.equal(queue.size, 3);

  const results = await queue.runAll();

  assert.deepEqual(results, ['first', 'second', 'third']);
  assert.equal(queue.size, 0);
});
