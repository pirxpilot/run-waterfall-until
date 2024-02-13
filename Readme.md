[![NPM version][npm-image]][npm-url]
[![Build Status][build-image]][build-url]
[![Dependency Status][deps-image]][deps-url]

# run-waterfall-until

Like [run-waterfall] but tasks can break out of the loop.

## Install

```sh
$ npm install --save run-waterfall-until
```

## Usage

`run-waterfal-until` processes the list of tasks one by one, ending processing as soon as one of the tasks says so.
The next task is invoked with arguments set by the previous task.
It is a cross between async operations: waterfall and some.

```js
const waterfallUntil = require('run-waterfall-until');


waterfallUntil([
  function (arg1, arg2, callback) {
    // arg1 now equals 'foo', and arg2 - 'bar'
    // false means continue
    callback(null, false, 'one', 'two');
  },
  function (arg1, arg2, callback) {
    // arg1 now equals 'one', and arg2 - 'two'
    // true means break out of the loop
    callback(null, true, 'three');
  },
  function (arg1, callback) {
    // this function is not called since previous one has called callback with 'true' 
    callback(null, 'done', 'wohoo');
  }
], 'foo', 'bar', function (err, result1) {
   // result1 now equals 'three'
});

```

## License

MIT © [Damian Krzeminski](https://pirxpilot.me)

[run-waterfall]: https://www.npmjs.com/package/run-waterfall

[npm-image]: https://img.shields.io/npm/v/run-waterfall-until
[npm-url]: https://npmjs.org/package/run-waterfall-until

[build-url]: https://github.com/pirxpilot/run-waterfall-until/actions/workflows/check.yaml
[build-image]: https://img.shields.io/github/actions/workflow/status/pirxpilot/run-waterfall-until/check.yaml?branch=main

[deps-image]: https://img.shields.io/librariesio/release/npm/run-waterfall-until
[deps-url]: https://libraries.io/npm/run-waterfall-until

