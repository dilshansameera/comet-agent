var EventEmitter = require('events').EventEmitter,
  util = require('util'),
  os = require('os');


function System(options) {
  var self = this;
  self.options = options || {
    interval: 2000
  };  
  self.type='system-stats';
  setInterval(

    function() {
      var loadavg = os.loadavg()[0];
      var loadavgcpu = loadavg / os.cpus().length;

      self.emit('metrics', {
        loadAverage: loadavg,
        loadAvgCpu: loadavgcpu,
        freeMemory: os.freemem()
      });
    }, self.options.interval);
}

util.inherits(System, EventEmitter);
module.exports = System;