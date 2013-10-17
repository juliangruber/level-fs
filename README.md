
# level-fs

node's [fs module](http://nodejs.org/api/fs.html) with
[leveldb](https://github.com/rvagg/node-levelup) as backend.

[![build status](https://secure.travis-ci.org/juliangruber/level-fs.png)](http://travis-ci.org/juliangruber/level-fs)

[![testling badge](https://ci.testling.com/juliangruber/level-fs.png)](https://ci.testling.com/juliangruber/level-fs)

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

## How it works

Paths are sublevels, so `/a/b/c` is basically `db.sublevel('a').sublevel('b').get('c')`.
Streaming access to stored data is provided through
[level-store](https://github.com/juliangruber/level-store).

## Implemented

* `readFile(filename, [options], callback)`
* `writeFile(filename, data, [options], callback)`
* `unlink(path, callback)`
* `chown(path, uid, gid, callback)`
* `chmod(path, mode, callback)`
* `mkdir(path, [mode], callback)`
* `readdir(path, callback)`
* `exists(path, callback)`
* `createReadStream(path, [options])`
* `createWriteStream(path, [options])`
* `Stats#isBlockDevice()`
* `Stats#isCharacterDevice()`
* `Stats#isSymbolicLink()`
* `Stats#isFIFO()`
* `Stats#isSocket()`
* `Stats#isFile()`
* `Stats#isDirectory()`
* error codes: `ENOENT`

## ToDo

* error codes
* empty but existing files
* modes
* users and groups
* byte indexes for offsets
* file descriptors
* directory support
* `rename(oldPath, newPath, callback)`
* `renameSync(oldPath, newPath)`
* `ftruncate(fd, len, callback)`
* `ftruncateSync(fd, len)`
* `truncate(path, len, callback)`
* `truncateSync(path, len)`
* `chownSync(path, uid, gid)`
* `fchown(fd, uid, gid, callback)`
* `fchownSync(fd, uid, gid)`
* `lchown(path, uid, gid, callback)`
* `lchownSync(path, uid, gid)`
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
* `Stats.{dev,ino,mode,nlink,uid,gid,rdev,size,blksize,blocks,atime,mtime,ctime}`
* `link(srcpath, dstpath, callback)`
* `linkSync(srcpath, dstpath)`
* `symlink(srcpath, dstpath, [type], callback)`
* `symlinkSync(srcpath, dstpath, [type])`
* `readlink(path, callback)`
* `readlinkSync(path)`
* `realpath(path, [cache], callback)`
* `realpathSync(path, [cache])`
* `unlinkSync(path)`
* `rmdir(path, callback)`
* `rmdirSync(path)`
* `mkdirSync(path, [mode])`
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
* `writeFileSync(filename, data, [options])`
* `appendFile(filename, data, [options], callback)`
* `appendFileSync(filename, data, [options])`
* `watchFile(filename, [options], listener)`
* `unwatchFile(filename, [listener])`
* `watch(filename, [options], [listener])`
* `existsSync(path)`

## Installation

With [npm](http://npmjs.org) do

```bash
$ npm install level-fs
```

## Tests

Run the tests in node:

```bash
$ npm test
```

Run the tests headlessly in [phantomjs](http://phantomjs.org):

```bash
$ npm run test-phantom
```

Run the tests in any browser, open `http://localhost:3001` to start:

```bash
$ npm run test-browser
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
