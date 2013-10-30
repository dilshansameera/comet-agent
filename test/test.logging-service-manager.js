var assert = require('assert'),
  LoggingServiceManager = require('../lib/logging-service-manager'),
  EventEmitter = require('events').EventEmitter,
  util = require('util');

suite('logging service manager', function() {

  test('1 service , 1 logger', function(done) {
    var loggingmanager = new LoggingServiceManager();
    var logtailmock1 = createLogtailMock(loggingmanager);
    var logcontent = Math.random();

    var logginservice1 = createLoggingServiceMock(loggingmanager);
    logginservice1.on('line', function(data) {
      assert.equal(data, logcontent);
      done();
    });
    logtailmock1.writeLog(logcontent);
  });

  test('2 services , 1 logger', function(done) {
    var loggingmanager = new LoggingServiceManager();
    var logtailmock1 = createLogtailMock(loggingmanager);
    var logcontent = Math.random();
    var count = 0;
    var logginservice1 = createLoggingServiceMock(loggingmanager);
    logginservice1.on('line', function(data) {
      assert.equal(data, logcontent);

      count++;
      if (count == 2) {
        done();
      }
    });

    var logginservice2 = createLoggingServiceMock(loggingmanager);
    logginservice2.on('line', function(data) {
      assert.equal(data, logcontent);
      count++;
      if (count == 2) {
        done();
      }
    });
    logtailmock1.writeLog(logcontent);
  });

  test('1 service , 2 loggers', function(done) {
    var loggingmanager = new LoggingServiceManager();
    var logcontent = Math.random();
    var logtailmock1 = createLogtailMock(loggingmanager);
    var logtailmock2 = createLogtailMock(loggingmanager);

    var count = 0;

    var logginservice1 = createLoggingServiceMock(loggingmanager);

    logginservice1.on('line', function(data) {
      assert.equal(data, logcontent);

      count++;
      if (count == 2) {
        done();
      }
    });

    logtailmock1.writeLog(logcontent);
    logtailmock2.writeLog(logcontent);

  });

  test('2 services , 2 loggers', function(done) {
    var loggingmanager = new LoggingServiceManager();
    var logcontent = Math.random();
    var logtailmock1 = createLogtailMock(loggingmanager);
    var logtailmock2 = createLogtailMock(loggingmanager);
    var count = 0;

    var logginservice1 = createLoggingServiceMock(loggingmanager);

    logginservice1.on('line', function(data) {
      assert.equal(data, logcontent);

      count++;
      if (count == 2) {
        done();
      }
    });

    var logginservice2 = createLoggingServiceMock(loggingmanager);
    logginservice2.on('line', function(data) {
      assert.equal(data, logcontent);

      count++;
      if (count == 2) {
        done();
      }
    });

    logtailmock1.writeLog(logcontent);
    logtailmock2.writeLog(logcontent);
  });

});

var createLogtailMock = function(loggingmanager) {
  var logtailmock = new LogTailerMock();
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