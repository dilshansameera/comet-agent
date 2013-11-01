function MetricsServiceManager() {
  this.providers = [];
  this.services = [];
}

MetricsServiceManager.prototype.registerProvider = function(provider) {
  var self = this;

  provider.on('metrics', function(data) {
    var length = self.services.length;
    for (var i = 0; i < length; i++) {
      self.services[i].track(provider.type, data);
    }
  });

};

MetricsServiceManager.prototype.registerService = function(service) {
  this.services.push(service);
};

module.exports = MetricsServiceManager;