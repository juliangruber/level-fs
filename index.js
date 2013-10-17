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
          return cb(enoent(err));
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
  if (m.level.sublevels[m.file] || path === '/') {
    stat._isFile = false;
    return cb(null, stat);
  }
  Store(m.level).head(m.file, { index: true }, function (err) {
    if (err) {
      if (err.message == 'range not found') enoent(err);
      return cb(err);
    }
    cb(null, stat);
  });
};

fs.prototype.exists = function (path, cb) {
  this.stat(path, function (err, stat) {
    cb(!!stat);
  });
};

fs.prototype.unlink = function (path, cb) {
  var m = this._getLevel(path);
  Store(m.level).delete(m.file, function (err) {
    if (err && err.message == 'Stream not found.') enoent(err);
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
  if (cb) nextTick(cb);
};

fs.prototype.readdir = function (path, cb) {
  var self = this;
  this.stat(path, function (err) {
    if (err) return cb(err);
    var m = self._getLevel(path.replace(/\/+$/, '') + '/xxx');
    var files = {};
    Object.keys(m.level.sublevels).forEach(function (dir) {
      files[dir] = true;
    });
    
    var ks = Store(m.level).createKeyStream();
    ks.on('data', function (file) {
      files[file] = true;
    });
    ks.on('end', function () {
      if (cb) cb(null, Object.keys(files));
    });
  });
};

fs.prototype.createReadStream = function (path, opts) {
  if (!opts) opts = {};

  var encoding = opts.encoding || 'binary';
  var flags = opts.flags || 'r';

  var m = this._getLevel(path);
  var rs = Store(m.level).createReadStream(m.file, { encoding: 'encoding' });

  var read = false;
  rs.once('data', function () {
    read = true;
  });
  rs.on('end', function () {
    if (!read && flags[0] == 'r') {
      var err = new Error('File not found');
      rs.emit('error', enoent(err));
    }
  });

  return rs;
};

fs.prototype.createWriteStream = function (path, opts) {
  if (!opts) opts = {};
  var flags = opts.flags || 'w';
  var encoding = opts.encoding || 'binary';
  var mode = opts.mode || 0666;
  var m = this._getLevel(path);
  return Store(m.level).createWriteStream(m.file, {
    append: flags[0] == 'a',
    valueEncoding: encoding
  });
};

fs.prototype._getLevel = function (path) {
  var segs = path.split('/').filter(Boolean);
  var file = segs.pop() || '';
  var level = segs.reduce(function (level, sub) {
    return level.sublevel(sub);
  }, this.db);
  return {
    level: level,
    file: file
  };
};

function enoent (err) {
  err.code = 'ENOENT';
  return err;
};
