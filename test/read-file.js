var test = require('tape');
var level = require('level-test')({ mem: true });
var levelFS = require('..');

test('simple', function (t) {
  t.plan(4);
  var db = level();
  var fs = levelFS(db);

  db.put('foo', Buffer('bar'), function (err) {
    t.error(err);
    fs.readFile('foo', function (err, data) {
      t.error(err, 'no error');
      t.assert(Buffer.isBuffer(data), 'is buffer');
      t.equal(data.toString(), 'bar', 'correct value');
    });
  });
});

test('non existant, bad flag', function (t) {
  t.plan(3);
  var fs = levelFS(level());
  fs.readFile('foo', function (err, data) {
    t.ok(err, 'has error');
    t.equal(err.code, 'ENOENT', 'error code');
    t.notOk(data, 'no data');
  });
});

test('non existant, good flag', function (t) {
  t.plan(2);
  var fs = levelFS(level());
  fs.readFile('foo', { flag: 'w' }, function (err, data) {
    t.notOk(err);
    t.equal(data.toString(), '');
  });
});

test('options string', function (t) {
  t.plan(4);
  var db = level();
  var fs = levelFS(db);

  db.put('foo', 'bar', function (err) {
    t.error(err);
    fs.readFile('foo', 'utf8', function (err, data) {
      t.error(err);
      t.assert(!Buffer.isBuffer(data));
      t.equal(data, 'bar');
    });
  });
});
