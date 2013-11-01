var libratoMetrics = require('librato-metrics');

function Librato(config) {
  if (!config)
    throw new Error('librato config not found')

  this.service = libratoMetrics.createClient(config);


}
Librato.prototype.track = function(type, data) {
  var gauges = [];
  for (var key in data) {
    gauges.push({
      name: key,
      value: data[key]
    })
  }


  this.service.post('/metrics', {
    gauges: gauges,
  }, function(err, response) {
    if (err) throw err;
  });
};
module.exports = Librato;