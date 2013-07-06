var test = require('tape');
var level = require('level-test')({ mem: true });
var db = level('read-file');
var fs = require('..')(db);

test('readFile(filename, [options], callback)', function (t) {
  t.plan(4);
  db.put('foo', Buffer('bar'), function (err) {
    t.error(err);
    fs.readFile('foo', function (err, data) {
      t.error(err);
      t.assert(Buffer.isBuffer(data));
      t.equal(data.toString(), 'bar');
    });
  })
});
