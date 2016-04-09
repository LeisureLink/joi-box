'use strict';

module.exports = function (wallaby) {
  return {
    files: [
      'src/**/*',
      { pattern: 'test/**/*.test.js', ignore: true }
    ],
    tests: [
      'test/**/*.test.js'
    ],
    env: {
      type: 'node'
    },
    workers: {
      recycle: true,
      initial: 1,
      regular: 1
    },
    compilers: {
      '**/*.js': wallaby.compilers.babel()
    }
  };
};