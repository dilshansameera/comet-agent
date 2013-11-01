function LoggingServiceManager() {
  this.services = [];
  this.logtailers = [];
}

LoggingServiceManager.prototype.registerlLogTailer = function(logtailer) {
  if (!logtailer)
    throw new Error('logtailer not provided');
  var self = this;
  logtailer.on('line', function(data) {
    var length = self.services.length;
    for (var i = 0; i < length; i++) {
      // console.log(logtailer.type);
      self.services[i].log(logtailer.type, data);
    }
  });
  this.logtailers.push(logtailer);
}

LoggingServiceManager.prototype.registerService = function(service) {
  if (!service)
    throw new Error('service not provided');
  this.services.push(service);
}
module.exports = LoggingServiceManager;