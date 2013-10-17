var test = require('tape');
var level = require('memdb');
var levelFS = require('..');

test('ENOENT', function (t) {
  t.plan(2);
  var fs = levelFS(level());

  fs.chmod('foo', 0666, function (err) {
    t.assert(err);
    t.equal(err.code, 'ENOENT');
  });
});

test('file', function (t) {
  t.plan(2);
  var db = level();
  var fs = levelFS(db);

  db.put('foo', 'bar', function (err) {
    t.error(err);
    fs.chmod('foo', 0666, function (err) {
      t.notOk(err);
    });
  });
});
