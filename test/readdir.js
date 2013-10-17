var test = require('tape');
var level = require('level-test')({ mem: true });
var levelFS = require('..');

test('list of files', function (t) {
  t.plan(4);
  var fs = levelFS(level());

  var files = [
    [ '/home/substack/robots.txt', 'beep boop' ],
    [ '/home/substack/a.txt', 'aaaa\nbbbb\ncccc' ],
    [ '/xyz.txt', 'x\ny\nz\n' ]
  ];
  
  (function next (err) {
    if (err) return t.fail(err);
    if (files.length > 0) {
      var file = files.shift();
      fs.writeFile(file[0], file[1], next);
    }
    else {
      fs.readdir('/home/substack', function (err, files) {
        t.deepEqual(files.sort(), [ 'a.txt', 'robots.txt' ]);
      });
      fs.readdir('/home', function (err, files) {
        t.deepEqual(files.sort(), [ 'substack' ]);
      });
      fs.readdir('/', function (err, files) {
        t.deepEqual(files.sort(), [ 'home', 'xyz.txt' ]);
      });
      fs.readdir('/whatever', function (err, files) {
        t.ok(err);
      });
    }
  })();
});
