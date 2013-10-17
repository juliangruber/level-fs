var test = require('tape');
var level = require('memdb');
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

test('not found, bad flag', function (t) {
  t.plan(2);
  var db = level();
  var fs = levelFS(db);

  fs.createReadStream('foo', { flags: 'r' })
    .on('data', function () {
      t.fail();
    })
    .on('error', function (err) {
      t.ok(err);
      t.equal(err.code, 'ENOENT');
    });
});

test('not found, good flag', function (t) {
  t.plan(1);
  var db = level();
  var fs = levelFS(db);

  fs.createReadStream('foo', { flags: 'w' })
    .on('data', function () {
      t.fail();
    })
    .on('end', function (err) {
      t.ok(true);
    });
});

test('close event', function (t) {
  t.plan(1);
  var db = level();
  var fs = levelFS(db);

  fs.createReadStream('foo', { flags: 'w' }).on('close', function (err) {
    t.ok(true);
  });
});
