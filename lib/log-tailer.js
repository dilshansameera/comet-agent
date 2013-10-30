var EventEmitter = require('events').EventEmitter;
var util = require('util');

function LogTailer(type, filename, options) {
  options = options || {
    interval: 1000
  };
  var self = this;
  var Tail = require('tail').Tail;
  this.type = type;
  this.filename = filename;

  var tail = new Tail(this.filename, '\n', options);
  tail.on("line", function(data) {
    self.emit("line", data);
  });
  tail.on("error", function(exeption) {
    self.emit("error", exeption);
  });
}

util.inherits(LogTailer, EventEmitter);
module.exports = LogTailer;