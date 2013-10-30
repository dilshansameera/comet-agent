var assert = require('assert'),
  LoggingServiceManager = require('../lib/logging-service-manager'),
  EventEmitter = require('events').EventEmitter,
  util = require('util');

suite('logging service manager', function() {

  test('1 service , 1 logger', function(done) {
    var loggingmanager = new LoggingServiceManager();
    var logType1 = "type" + Math.random();
    var logtailmock1 = createLogtailMock(loggingmanager, logType1);
    var logcontent = Math.random();


    var logginservice1 = createLoggingServiceMock(loggingmanager);
    logginservice1.log = function(type, message) {
      assert.equal(logcontent, message);
      assert.equal(logType1, type);
      done();
    }
    logtailmock1.writeLog(logcontent);
  });

  test('2 services , 1 logger', function(done) {
    var loggingmanager = new LoggingServiceManager();
    var logType1 = "type" + Math.random();
    var logtailmock1 = createLogtailMock(loggingmanager, logType1);
    var logcontent = Math.random();
    var count = 0;
    var logginservice1 = createLoggingServiceMock(loggingmanager);
    logginservice1.log = function(type, message) {
      assert.equal(logcontent, message);
      count++;
      if (count == 2) {
        done();
      }
    }
    var logginservice2 = createLoggingServiceMock(loggingmanager);
    logginservice2.log = function(type, message) {
      assert.equal(logcontent, message);
      assert.equal(logType1, type);
      count++;
      if (count == 2) {
        done();
      }
    }
    logtailmock1.writeLog(logcontent);
  });

  test('1 service , 2 loggers', function(done) {
    var loggingmanager = new LoggingServiceManager();
    var logType1 = "type" + Math.random();
    var logType2 = "type" + Math.random();
    var logcontent1 = Math.random();
    var logcontent2 = Math.random();
    var logtailmock1 = createLogtailMock(loggingmanager, logType1);
    var logtailmock2 = createLogtailMock(loggingmanager, logType2);

    var count = 0;

    var logginservice1 = createLoggingServiceMock(loggingmanager);
    logginservice1.log = function(type, message) {
      if (type == logType1) {
        assert.equal(logcontent1, message);
      } else {
        assert.equal(type, logType2);
        assert.equal(logcontent2, message);
      }
      count++;
      if (count == 2) {
        done();
      }
    }
    logtailmock1.writeLog(logcontent1);
    logtailmock2.writeLog(logcontent2);
  });

  test('2 services , 2 loggers', function(done) {
    var loggingmanager = new LoggingServiceManager();
    var logcontent1 = Math.random();
    var logcontent2 = Math.random();
    var logType1 = "type" + Math.random();
    var logType2 = "type" + Math.random();
    var logtailmock1 = createLogtailMock(loggingmanager, logType1);
    var logtailmock2 = createLogtailMock(loggingmanager, logType2);
    var count = 0;

    var logginservice1 = createLoggingServiceMock(loggingmanager);

    logginservice1.log = function(type, message) {
      if (type == logType1) {
        assert.equal(logcontent1, message);
      } else {
        assert.equal(type, logType2);
        assert.equal(logcontent2, message);
      }
      count++;
      if (count == 2) {
        done();
      }
    }

    var logginservice2 = createLoggingServiceMock(loggingmanager);

    logginservice2.log = function(type, message) {
      if (type == logType1) {
        assert.equal(logcontent1, message);
      } else {
        assert.equal(type, logType2);
        assert.equal(logcontent2, message);
      }
      count++;
      if (count == 2) {
        done();
      }
    }

    logtailmock1.writeLog(logcontent1);
    logtailmock2.writeLog(logcontent2);
  });

});

var createLogtailMock = function(loggingmanager, type) {
  var logtailmock = new LogTailerMock();
  logtailmock.type = type;
  loggingmanager.registerlLogTailer(logtailmock);
  return logtailmock;
}

var createLoggingServiceMock = function(loggingmanager) {
  var logginservice = new LoggingServiceMock();
  loggingmanager.registerService(logginservice);
  return logginservice;
}


  function LogTailerMock() {}

util.inherits(LogTailerMock, EventEmitter);

LogTailerMock.prototype.writeLog = function(line) {
  this.emit("line", line);
}

function LoggingServiceMock() {

}
util.inherits(LoggingServiceMock, EventEmitter);