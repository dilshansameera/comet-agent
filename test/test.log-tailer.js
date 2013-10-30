var assert = require('assert'),
  fs = require('fs')
  LogTail = require('../lib/log-tailer');

suite('log tail', function() {
  test('file should read on new line added', function(done) {
    var filepath = "/tmp/log-tailer-test-" + Math.random();
    var content = Math.random();
    fs.openSync(filepath, 'w');
    var logtail = new LogTail("test1", filepath,{interval:100});
    logtail.on('line', function(data) {
      assert.equal(content, data);
      done();
    });
    fs.writeFileSync(filepath, content + "\n");

  });

  test('file delete and rewrite', function(done) {
    var filepath = "/tmp/log-tailer-test-" + Math.random();
    var content = Math.random();
    fs.openSync(filepath, 'w');
    var logtail = new LogTail("test2", filepath,{interval:100});
    logtail.on('line', function(data) {
      assert.equal(content, data);
      fs.unlinkSync(filepath);
      done();
    });
    fs.unlinkSync(filepath);
    fs.writeFileSync(filepath, content + "\n");
  });

  // test('tail for not existing file', function(done) {
  //   var filepath = "/tmp/log-tailer-test-" + Math.random();
  //   var logtail = new LogTail("test3", filepath);
  //   // logtail.on('line', function(data) {
  //   //   assert.equal(content, data);
  //   //   done();
  //   // });
  //   logtail.on('error',function(exception){
  //     done();
  //   });
  // });

});