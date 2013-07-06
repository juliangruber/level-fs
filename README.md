
# level-fs

node's [fs module](http://nodejs.org/api/fs.html) with
[leveldb](https://github.com/rvagg/node-levelup) as backend.

## Usage

```js
var level = require('level');
var db = level(__dirname + '/db');
var fs = require('level-fs')(db);

fs.readFile('/etc/passwd', function (err, data) {
  if (err) throw err;
  console.log(data);
});
```

## Implemented

* `readFile(filename, [options], callback)`

## ToDo

* `rename(oldPath, newPath, callback)`
* `renameSync(oldPath, newPath)`
* `ftruncate(fd, len, callback)`
* `ftruncateSync(fd, len)`
* `truncate(path, len, callback)`
* `truncateSync(path, len)`
* `chown(path, uid, gid, callback)`
* `chownSync(path, uid, gid)`
* `fchown(fd, uid, gid, callback)`
* `fchownSync(fd, uid, gid)`
* `lchown(path, uid, gid, callback)`
* `lchownSync(path, uid, gid)`
* `chmod(path, mode, callback)`
* `chmodSync(path, mode)`
* `fchmod(fd, mode, callback)`
* `fchmodSync(fd, mode)`
* `lchmod(path, mode, callback)`
* `lchmodSync(path, mode)`
* `stat(path, callback)`
* `lstat(path, callback)`
* `fstat(fd, callback)`
* `statSync(path)`
* `lstatSync(path)`
* `fstatSync(fd)`
* `link(srcpath, dstpath, callback)`
* `linkSync(srcpath, dstpath)`
* `symlink(srcpath, dstpath, [type], callback)`
* `symlinkSync(srcpath, dstpath, [type])`
* `readlink(path, callback)`
* `readlinkSync(path)`
* `realpath(path, [cache], callback)`
* `realpathSync(path, [cache])`
* `unlink(path, callback)`
* `unlinkSync(path)`
* `rmdir(path, callback)`
* `rmdirSync(path)`
* `mkdir(path, [mode], callback)`
* `mkdirSync(path, [mode])`
* `readdir(path, callback)`
* `readdirSync(path)`
* `close(fd, callback)`
* `closeSync(fd)`
* `open(path, flags, [mode], callback)`
* `openSync(path, flags, [mode])`
* `utimes(path, atime, mtime, callback)`
* `utimesSync(path, atime, mtime)`
* `futimes(fd, atime, mtime, callback)`
* `futimesSync(fd, atime, mtime)`
* `fsync(fd, callback)`
* `fsyncSync(fd)`
* `write(fd, buffer, offset, length, position, callback)`
* `writeSync(fd, buffer, offset, length, position)`
* `read(fd, buffer, offset, length, position, callback)`
* `readSync(fd, buffer, offset, length, position)`
* `readFileSync(filename, [options])`
* `writeFile(filename, data, [options], callback)`
* `writeFileSync(filename, data, [options])`
* `appendFile(filename, data, [options], callback)`
* `appendFileSync(filename, data, [options])`
* `watchFile(filename, [options], listener)`
* `unwatchFile(filename, [listener])`
* `watch(filename, [options], [listener])`
* `exists(path, callback)`
* `existsSync(path)`
* `createReadStream(path, [options])`
* `createWriteStream(path, [options])`
* error codes

## Limitations

When opening a non-existing file with a flag like `w` or `a`, which should cause it to be created, it isn't, because we can't store empty strings in LevelDB. But, as soon as written to that file, it is created anyways.

## Installation

With [npm](http://npmjs.org) do

```bash
$ npm install level-fs
```

## License

Copyright (c) 2013 Julian Gruber &lt;julian@juliangruber.com&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
