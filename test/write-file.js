var test = require('tape');
var level = require('level-test')({ mem: true });
var levelFS = require('..');

test('simple', function (t) {
  t.plan(3);
  var db = level();
  var fs = levelFS(db);

  fs.writeFile('foo', 'bar', function (err) {
    t.error(err);
    fs.readFile('foo', function (err, data) {
      t.error(err, 'no error');
      t.equal(data.toString(), 'bar', 'correct value');
    });
  });
});

//test('non existant, bad flag');
//test('options string');
