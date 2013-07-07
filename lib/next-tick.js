module.exports = typeof setImmediate === 'function'
  ? setImmediate
  : process.nextTick;
