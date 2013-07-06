var test = require('tape');
var level = require('level-test')({ mem: true });
var levelFS = require('..');
var Store = require('level-store');

test('simple', function (t) {
  t.plan(2);
  var db = level();
  var fs = levelFS(db);

  var ws = Store(db).createWriteStream('foo');
  ws.on('close', function () {
    var first = true;
    fs.createReadStream('foo').on('data', function (chunk) {
      if (first) {
        t.equal(chunk, 'first');
        first = false;
      } else {
        t.equal(chunk, 'second');
      }
    }); 
  });
  ws.write('first');
  ws.write('second');
  ws.end();
});

test('not found', function (t) {
  t.plan(2);
  var db = level();
  var fs = levelFS(db);

  fs.createReadStream('foo')
    .on('data', function () {
      t.fail();
    })
    .on('error', function (err) {
      t.ok(err);
      t.equal(err.code, 'ENOENT');
    });
});
