var SubLevel = require('level-sublevel');
var Store = require('level-store');
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
  var flag = opts.flag || 'r';
  var m = this._getLevel(filename);
  var data = [];

  Store(m.level).createReadStream(m.file, {
    valueEncoding: encoding
  })
  .on('error', cb)
  .on('data', function (d) {
    data.push(d);
  })
  .on('end', function () {
    if (!data.length && flag[0] == 'r') {
      var err = new Error('file doesn\'t exist');
      err.code = 'ENOENT';
      return cb(err);
    }

    var res;
    if (encoding == 'binary') {
      res = Buffer.concat(data);
    } else {
      res = data.join('');
    }
    cb(null, res);
  });
};

fs.prototype.writeFile = function (filename, data, opts, cb) {
  if (typeof opts == 'function') {
    cb = opts;
    opts = {};
  }
  if (typeof opts == 'string') opts = { encoding: opts };
  if (typeof opts == 'undefined') opts = {};

  var encoding = opts.encoding || 'utf8';
  var flag = opts.flag || 'w';

  var m = this._getLevel(filename);
  var ws = Store(m.level).createWriteStream(m.file, { encoding: encoding });

  var called = false;
  function done (err) {
    if (called) return;
    called = true;
    if (cb) cb(err);
  }
  ws.on('close', done);
  ws.on('error', done);

  ws.write(data);
  ws.end();
};

fs.prototype.stat = function (path, cb) {
  var stat = new Stats();
  var m = this._getLevel(path);
  if (m.level.sublevels[m.file]) {
    stat._isFile = false;
    return cb(null, stat);
  }
  Store(m.level).head(m.file, { index: true }, function (err) {
    if (err) {
      if (err.message == 'range not found') err.code = 'ENOENT';
      return cb(err);
    }
    cb(null, stat);
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
