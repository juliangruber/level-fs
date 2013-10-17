var test = require('tape');
var level = require('memdb');
var levelFS = require('..');

test('without mode', function (t) {
  t.plan(3);
  var fs = levelFS(level());

  fs.mkdir('a', function (err) {
    t.error(err);
    fs.stat('a', function (err, stat) {
      t.error(err);
      t.ok(stat.isDirectory());
    });
  });
});

test('with mode', function (t) {
  t.plan(3);
  var fs = levelFS(level());

  fs.mkdir('a', '0666', function (err) {
    t.error(err);
    fs.stat('a', function (err, stat) {
      t.error(err);
      t.ok(stat.isDirectory());
    });
  });
});
