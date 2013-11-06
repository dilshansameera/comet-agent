var configPath = process.argv[2];

if (!configPath)
  throw new Error('invalid config Path');

var mainConfig = require(configPath);


if (typeof(gc) == 'function') {
  console.log(' >> .gc() every 5 min to keep low memory profile');
  setInterval(function() {
    gc();
  }, 1000 * 60 * 5);
}

var startLogMan = require('../lib/main/logsman');

var startMetricsMan = require('../lib/main/metricsman');

startLogMan(mainConfig.logs);
startMetricsMan(mainConfig.metrics);
