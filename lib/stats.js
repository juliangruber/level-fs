module.exports = Stats;

function Stats () {
  this._isFile = true;
};

Stats.prototype.isFile = function () {
  return this._isFile;
};

Stats.prototype.isDirectory = function () {
  return !this._isFile;
};

// not supported
Stats.prototype.isBlockDevice =
Stats.prototype.isCharacterDevice =
Stats.prototype.isSymbolicLink =
Stats.prototype.isFIFO =
Stats.prototype.isSocket = function () {
  return false;
};
