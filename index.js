var SubLevel = require('level-sublevel');
var Stats = require('./lib/stats');

module.exports = fs;

function fs (db) {
  if (!(this instanceof fs)) return new fs(db);
  this.db = SubLevel(db);
}

fs.prototype.readFile = function (filename, opts, cb) {
  if (typeof opts == 'function') {
    cb = opts;
    opts = {};
  } else if (typeof opts == 'string') {
    opts = { encoding: opts };
  }

  var encoding = opts.encoding || 'binary';
  var m = this._getLevel(filename);
  m.level.get(m.file, {
    valueEncoding: encoding
  }, function (err, data) {
    if (err) {
      if (err.name == 'NotFoundError' && /^(a|w)/.test(opts.flag)) {
        cb(null, encoding == 'binary'? new Buffer('') : '');
      } else {
        cb(err);
      }
    } else {
      cb(null, data);
    }
  });
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
