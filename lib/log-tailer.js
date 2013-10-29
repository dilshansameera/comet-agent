var EventEmitter = require('events').EventEmitter;
var util = require('util');

function LogTailer(type, filename) {
  var self = this;
  var Tail = require('tail').Tail;
  this.type = type;
  this.filename = filename;

  var tail = new Tail(this.filename);
  tail.on("line", function(data) {
    self.emit("line", data);
  });
}

util.inherits(LogTailer, EventEmitter);

module.exports = LogTailer;