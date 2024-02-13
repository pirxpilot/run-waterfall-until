const { describe, it } = require('node:test');
const assert = require('assert');

const waterfallUntil = require('..');

describe('run waterfall until', function () {

  it('must run all tasks', function (_, done) {

    function task(a, b, fn) {
      fn(null, false, a + 'A', b + 'B');
    }

    waterfallUntil([
      task,
      task,
      task
    ], '1', '2', function (err, a, b) {
      assert.equal(a, '1AAA');
      assert.equal(b, '2BBB');
      done(err);
    });

  });


  it('must exit when task sets exit flag', function (_, done) {

    waterfallUntil([
      (a, b, fn) => fn(undefined, false, a + a, b + b),
      (a, b, fn) => fn(undefined, true, a + a, b + b),
      function () {
        assert.fail('this is not to be called');
      }
    ], 'A', 'B', function (err, a, b) {
      assert.equal(a, 'AAAA');
      assert.equal(b, 'BBBB');
      done(err);
    });

  });


  it('must exit when task returns an error', function (_, done) {

    waterfallUntil([
      (a, b, fn) => fn(undefined, false, a + a, b + b),
      (a, b, fn) => fn('error'),
      function () {
        assert.fail('this is not to be called');
      }
    ], 'A', 'B', function (err) {
      assert.equal(err, 'error');
      done();
    });

  });

});
