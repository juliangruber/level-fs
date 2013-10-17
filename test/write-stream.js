var test = require('tape');
var level = require('memdb');
var levelFS = require('..');

test('simple', function (t) {
  t.plan(2);
  var fs = levelFS(level());

  var ws = fs.createWriteStream('foo');
  ws.write('bar');
  ws.write('baz');
  ws.end();
  ws.on('close', function () {
    fs.readFile('foo', function (err, data) {
      t.error(err, 'no error');
      t.equal(data.toString(), 'barbaz', 'correct value');
    });
  });
});

test('replace', function (t) {
  t.plan(2);
  var fs = levelFS(level());

  var ws = fs.createWriteStream('foo');
  ws.write('bar');
  ws.end();
  ws.on('close', function () {
    var ws2 = fs.createWriteStream('foo');
    ws2.write('baz');
    ws2.end();
    ws2.on('close', function () {
      fs.readFile('foo', function (err, data) {
        t.error(err, 'no error');
        t.equal(data.toString(), 'baz', 'replaced');
      });
    });
  });
});

test('append', function (t) {
  t.plan(2);
  var fs = levelFS(level());

  var ws = fs.createWriteStream('foo');
  ws.write('bar');
  ws.end();
  ws.on('close', function () {
    var ws2 = fs.createWriteStream('foo', { flags: 'a' });
    ws2.write('baz');
    ws2.end();
    ws2.on('close', function () {
      fs.readFile('foo', function (err, data) {
        t.error(err, 'no error');
        t.equal(data.toString(), 'barbaz', 'appended');
      });
    });
  });
});
