var test = require('tape');
var level = require('level-test')({ mem: true });
var db = level('read-file');
var fs = require('..')(db);

test('with sublevel', function (t) {
  var a = db.sublevel('a');
  var b = a.sublevel('b');
  var m = fs._getLevel('/a/b/c');
  t.equal(m.level, b);
  t.equal(m.file, 'c');
  t.end();
});

test('without sublevel', function (t) {
  var m = fs._getLevel('c');
  t.equal(m.level, db);
  t.equal(m.file, 'c');
  t.end();
});
