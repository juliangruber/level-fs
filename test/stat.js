var test = require('tape');
var level = require('memdb');
var levelFS = require('..');

test('ENOENT', function (t) {
  t.plan(2);
  var fs = levelFS(level());

  fs.stat('foo', function (err, stat) {
    t.assert(err);
    t.equal(err.code, 'ENOENT');
  });
});

test('file', function (t) {
  t.plan(3);
  var fs = levelFS(level());

  fs.writeFile('foo', 'bar', function (err) {
    t.error(err);
    fs.stat('foo', function (err, stat) {
      t.error(err);
      t.assert(stat.isFile());
    });
  });
});

test('directory', function (t) {
  t.plan(3);
  var fs = levelFS(level());

  fs.writeFile('a/foo', 'bar', function (err) {
    t.error(err);
    fs.stat('a', function (err, stat) {
      t.error(err);
      t.assert(stat.isDirectory());
    });
  });
});
