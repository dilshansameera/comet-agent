// var Winston = require('./winston');
var winston = require('winston')
require('winston-papertrail').Papertrail;
var util = require('util');

function Papertrail(config) {
  if(!config)
    throw new Error('papertrail config options missing ');
  this.logger = new winston.transports.Papertrail({
    host: config.host,
    port: config.port
  });
}

Papertrail.prototype.log = function(type, message) {
  this.logger.program = type;
  this.logger.log("", message, function() {});
};

// util.inherits(Papertrail, Winston);
module.exports = Papertrail;