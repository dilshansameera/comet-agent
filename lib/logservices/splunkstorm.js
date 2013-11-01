var winston = require("winston");
var SplStorm = require("winston-splunkstorm");


function SplunkStorm(config) {
  this.logger = new winston.transports.SplunkStorm(
    config
  );
}

SplunkStorm.prototype.log = function(type, message) {

  console.log('splunk storm', type, message);
  this.logger.options.sourcetype = type;
  this.logger.log("", message, "", function() {})
};

module.exports = SplunkStorm;