var assert = require('assert'),
  fs = require('fs')
  LogTail = require('../lib/log-tailer');

suite('log tail', function() {
  test('file should read on new line added', function(done) {
    var filepath = "/tmp/log-tailer-test-" + Math.random();
    var content = Math.random();
    fs.openSync(filepath, 'w');
    var logtail = new LogTail("testsuite",filepath);
    logtail.on('line', function(data) {
      console.log(data)
      assert.equal(content, data)
      done();
    });
    fs.writeFileSync(filepath, content+"\n");
  });
});