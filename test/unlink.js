var test = require('tape');
var level = require('memdb');
var levelFS = require('..');

test('unlink existing file', function (t) {
  t.plan(3);
  var fs = levelFS(level());

  fs.writeFile('foo', 'bar', function (err) {
    t.error(err);
    fs.unlink('foo', function (err) {
      t.error(err);
      fs.stat('foo', function (err) {
        t.ok(err);
      });
    });
  });
});

test('unlink not existing file', function (t) {
  t.plan(2);
  var fs = levelFS(level());

  fs.unlink('foo', function (err) {
    t.ok(err);
    t.equal(err.code, 'ENOENT');
  });
});
