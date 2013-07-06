module.exports = Stats;

function Stats () {

};

Stats.prototype.isFile = function () {

};

Stats.prototype.isDirectory = function () {

};

// not supported
Stats.prototype.isBlockDevice =
Stats.prototype.isCharacterDevice =
Stats.prototype.isSymbolicLink =
Stats.prototype.isFIFO =
Stats.prototype.isSocket = function () {
  return false;
};
