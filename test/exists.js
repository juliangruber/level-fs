var test = require('tape');
var level = require('memdb');
var levelFS = require('..');

test('exists', function (t) {
  t.plan(2);
  var fs = levelFS(level());

  fs.writeFile('foo', 'bar', function (err) {
    t.error(err);
    fs.exists('foo', function (exists) {
      t.assert(exists);
    });
  });
});

test('exist not', function (t) {
  t.plan(1);
  var fs = levelFS(level());

  fs.exists('foo', function (exists) {
    t.notOk(exists);
  });
});

test('directory', function (t) {
  t.plan(2);
  var fs = levelFS(level());

  fs.writeFile('a/foo', 'bar', function (err) {
    t.error(err);
    fs.exists('a', function (exists) {
      t.assert(exists);
    });
  });
});
