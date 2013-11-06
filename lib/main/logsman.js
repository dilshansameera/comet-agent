var fs = require('fs'),
  path = require('path')
  LogTail = require('../log-tailer'),
  mkdirp = require('mkdirp');

function startLogMan(config){
  if (!config) {
    throw new Error('unable to parse config file');
  }
  var LoggingServiceManager = require('../logging-service-manager');
  var loggingmanager = new LoggingServiceManager();

  var logFilesList = config.logFiles;

  for (var type in logFilesList) {
    var logfilename = logFilesList[type];
    if (!fs.existsSync(logfilename)) { //create file if it does not exist
      mkdirp.sync(path.dirname(logfilename));
      fs.writeFileSync(logfilename, "");
    }
    var logtail = new LogTail(type, logfilename, {
      interval: config.watchFileInterval
    });
    loggingmanager.registerlLogTailer(logtail);
  }

  var servicesList = config.services;
  // console.log(servicesList);
  for (var servicename in servicesList) {
    var Service = require('../logservices/' + servicename);
    var serviceConfig = servicesList[servicename];
    var service = new Service(serviceConfig);
    loggingmanager.registerService(service);
  }
}
module.exports = startLogMan;