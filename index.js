var SubLevel = require('level-sublevel');
var Store = require('level-store');
var Stats = require('./lib/stats');
var nextTick = require('./lib/next-tick');

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

  Store(m.level).get(m.file, {
    valueEncoding: encoding
  }, function (err, data) {
    if (err) {
      if (err.message == 'Stream not found.') {
        if (flag[0] != 'r') {
          err = null;
        } else {
          err.code = 'ENOENT';
          return cb(err);
        }
      } else {
        return cb(err);
      }
    }
    if (!err && !data) {
      data = encoding == 'binary'
        ? new Buffer('')
        : '';
    }
    return cb(err, data);
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
  var method = flag[0] == 'w'
    ? 'set'
    : 'append';
  Store(m.level)[method](m.file, data, { encoding: encoding }, cb);
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

fs.prototype.unlink = function (path, cb) {
  var m = this._getLevel(path);
  Store(m.level).delete(m.file, function (err) {
    if (err && err.message == 'Stream not found.') err.code = 'ENOENT';
    cb(err);
  });
};

fs.prototype.chown = function (path, uid, gid, cb) {
  this.stat(path, cb);
};

fs.prototype.chmod = function (path, mode, cb) {
  this.stat(path, cb);
};

fs.prototype.mkdir = function (path, mode, cb) {
  if (typeof mode == 'function') {
    cb = mode;
    mode = 0777;
  }
  var m = this._getLevel(path);
  m.level.sublevel(m.file);
  nextTick(cb);
};

fs.prototype.createReadStream = function (path, opts) {
  if (!opts) opts = {};

  var encoding = opts.encoding || 'binary';
  var flags = opts.flags || 'r';

  var m = this._getLevel(path);
  var rs = Store(m.level).createReadStream(path, { encoding: 'encoding' });

  var read = false;
  rs.once('data', function () {
    read = true;
  });
  rs.on('end', function () {
    if (!read && flags[0] == 'r') {
      var err = new Error('File not found');
      err.code = 'ENOENT';
      rs.emit('error', err);
    }
  });

  return rs;
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
