var SubLevel = require('level-sublevel');

module.exports = fs;

function fs (db) {
  if (!(this instanceof fs)) return new fs(db);
  this.db = SubLevel(db);
}

fs.prototype.readFile = function (filename, opts, cb) {
  if (typeof opts == 'function') {
    cb = opts;
    opts = {};
  }
  var m = this._getLevel(filename);
  m.level.get(m.file, {
    valueEncoding: opts.encoding || 'binary'
  }, cb);
};

fs.prototype._getLevel = function (path) {
  var segs = path.split('/').filter(Boolean);
  var file = segs.pop();
  var level = segs.reduce(function (level, sub) {
    return level.sublevel(sub);
  }, this.db);
  return {
    level: level,
    file: file
  };
};
