var test = require('tape');
var level = require('level-test')({ mem: true });
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
  var db = level();
  var fs = levelFS(db);

  db.put('foo', 'bar', function (err) {
    t.error(err);
    fs.stat('foo', function (err, stat) {
      t.error(err);
      t.assert(stat.isFile());
    });
  });
});

test('directory', function (t) {
  t.plan(3);
  var db = level();
  var fs = levelFS(db);
  db.sublevel('a').put('foo', 'bar', function (err) {
    t.error(err);
    fs.stat('a', function (err, stat) {
      t.error(err);
      t.assert(stat.isDirectory());
    });
  });
});
