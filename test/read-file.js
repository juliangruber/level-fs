var test = require('tape');
var level = require('level-test')({ mem: true });
var db = level('read-file');
var levelFS = require('..');

test('simple', function (t) {
  t.plan(4);
  var db = level();
  var fs = levelFS(db);

  db.put('foo', Buffer('bar'), function (err) {
    t.error(err);
    fs.readFile('foo', function (err, data) {
      t.error(err);
      t.assert(Buffer.isBuffer(data));
      t.equal(data.toString(), 'bar');
    });
  });
});

test('non existant, bad flag', function (t) {
  t.plan(2);
  var fs = levelFS(level());
  fs.readFile('foo', function (err, data) {
    t.ok(err);
    t.notOk(data);
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
