module.exports = fs;

function fs (db) {
  this.db = db;
}

fs.prototype.readFile = function (filename, opts, cb) {
  if (typeof opts == 'function') {
    cb = opts;
    opts = {};
  }
};
