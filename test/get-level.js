var test = require('tape');
var level = require('memdb');
var db = level();
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

test('leading slash', function (t) {
  var m = fs._getLevel('/file.txt');
  t.equal(m.level, db);
  t.equal(m.file, 'file.txt');
  t.end();
});
