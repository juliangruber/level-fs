var test = require('tape');
var level = require('memdb');
var levelFS = require('..');

test('simple', function (t) {
  t.plan(3);
  var fs = levelFS(level());

  fs.writeFile('foo', 'bar', function (err) {
    t.error(err);
    fs.readFile('foo', function (err, data) {
      t.error(err, 'no error');
      t.equal(data.toString(), 'bar', 'correct value');
    });
  });
});

test('replace', function (t) {
  t.plan(4);
  var fs = levelFS(level());

  fs.writeFile('foo', 'bar', function (err) {
    t.error(err);
    fs.writeFile('foo', 'baz', function (err) {
      t.error(err);
      fs.readFile('foo', function (err, data) {
        t.error(err, 'no error');
        t.equal(data.toString(), 'baz', 'replaced');
      });
    });
  });
});

test('append', function (t) {
  t.plan(4);
  var fs = levelFS(level());

  fs.writeFile('foo', 'bar', function (err) {
    t.error(err);
    fs.writeFile('foo', 'baz', { flag: 'a' }, function (err) {
      t.error(err);
      fs.readFile('foo', function (err, data) {
        t.error(err, 'no error');
        t.equal(data.toString(), 'barbaz', 'appended');
      });
    });
  });

});

//test('non existant, bad flag');
//test('options string');
