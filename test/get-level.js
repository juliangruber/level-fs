var test = require('tape');
var level = require('level-test')({ mem: true });
var db = level('read-file');
var fs = require('..')(db);

test('_getLevel(path)', function (t) {
  t.plan(2);
  var a = db.sublevel('a');
  var b = a.sublevel('b');
  var m = fs._getLevel('/a/b/c');
  t.equal(m.level, b);
  t.equal(m.file, 'c');
});
