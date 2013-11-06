var configPath = process.argv[2],
  fs = require('fs');

function startMetricsMan(config){
  if (!config) {
    throw new Error('unable to parse config file');
  }
  var metricsServiceManager = require('../metrics-service-manager');

  var metricsManager = new metricsServiceManager();

  var providersList = config.providers;

  for (var providername in providersList) {
    var Provider = require('../metricproviders/' + providername);
    var providerConfig = providersList[providername];
    var provider = new Provider(providerConfig);
    metricsManager.registerProvider(provider);
  }


  var servicesList = config.services;

  for (var servicename in servicesList){
    var Service = require('../metricsservices/'+servicename)
    var serviceConfig = servicesList[servicename];
    var service = new Service(serviceConfig);
    metricsManager.registerService(service);
  }

}

module.exports = startMetricsMan;