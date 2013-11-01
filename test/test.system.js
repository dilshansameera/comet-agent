var assert = require('assert'),
  System = require('../lib/metricproviders/system');

suite('system stats', function() {
  test('load average , free memory', function(done) {
    var system = new System({
      interval: 100
    });
    var count = 0;
    assert.equal(system.type,'system-stats');
    system.on('metrics', function(data) {
      if (data && data.loadAverage && data.loadAvgCpu && data.freeMemory) {
        count++;
      } else {
        throw new Error('os stats missing');
      }
      if (count == 5) {
        done();
      }
    });
  });
});