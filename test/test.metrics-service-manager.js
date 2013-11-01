var assert = require('assert'),
  MetricsServiceManager = require('../lib/metrics-service-manager'),
  EventEmitter = require('events').EventEmitter,
  util = require('util');

suite('logging services manager', function() {

  test('1 provider 1 service', function(done) {
    var metricsmanager = new MetricsServiceManager();

    var providermock1 = new ProviderMock();
    var type1 = "type" + Math.random();
    var matriccontent1 = Math.random();
    providermock1.type = type1;
    metricsmanager.registerProvider(providermock1);

    var servicemock1 = new ServiceMock();
    servicemock1.type = "type" + Math.random();

    servicemock1.track = function(type, data) {
      assert.equal(type1, type);
      done();
    }
    metricsmanager.registerService(servicemock1);
    providermock1.writeMatric(matriccontent1);
  });


  test('2 providers 1 service', function(done) {
    var metricsmanager = new MetricsServiceManager();

    var providermock1 = new ProviderMock();
    var type1 = "type" + Math.random();
    var matriccontent1 = Math.random();
    providermock1.type = type1;
    metricsmanager.registerProvider(providermock1);


    var providermock2 = new ProviderMock();
    var type2 = "type" + Math.random();
    var matriccontent2 = Math.random();
    providermock2.type = type2;
    metricsmanager.registerProvider(providermock2);

    var servicemock1 = new ServiceMock();
    servicemock1.type = "type" + Math.random();

    var count = 0;
    servicemock1.track = function(type, data) {
      if (type1 == type) {

        assert.equal(data, matriccontent1)
      } else {
        assert.equal(type2, type);
        assert.equal(data, matriccontent2)
      }

      count++;
      if (count == 2) {
        done();
      }
    }
    metricsmanager.registerService(servicemock1);
    providermock1.writeMatric(matriccontent1);
    providermock2.writeMatric(matriccontent2);
  });

  test('1 provider 2 service', function(done) {
    var metricsmanager = new MetricsServiceManager();

    var providermock1 = new ProviderMock();
    var type1 = "type" + Math.random();
    var matriccontent1 = Math.random();
    providermock1.type = type1;
    metricsmanager.registerProvider(providermock1);

    var count = 0;

    var servicemock1 = new ServiceMock();
    servicemock1.type = "type" + Math.random();
    servicemock1.track = function(type, data) {
      assert.equal(type1, type);
      count++;
      if (count == 2) {
        done();
      }
    }

    var servicemock2 = new ServiceMock();
    servicemock2.type = "type" + Math.random();
    servicemock2.track = function(type, data) {
      assert.equal(type1, type);
      count++;
      if (count == 2) {
        done();
      }
    }

    metricsmanager.registerService(servicemock1);
    metricsmanager.registerService(servicemock2);
    providermock1.writeMatric(matriccontent1);
  });

  test('2 provider 2 service', function(done) {
    var metricsmanager = new MetricsServiceManager();

    var providermock1 = new ProviderMock();
    var type1 = "type" + Math.random();
    var matriccontent1 = Math.random();
    providermock1.type = type1;
    metricsmanager.registerProvider(providermock1);


    var providermock2 = new ProviderMock();
    var type2 = "type" + Math.random();
    var matriccontent2 = Math.random();
    providermock2.type = type2;
    metricsmanager.registerProvider(providermock2);

    var count = 0;

    var servicemock1 = new ServiceMock();
    servicemock1.type = "type" + Math.random();
    servicemock1.track = function(type, data) {
      if (type1 == type) {

        assert.equal(data, matriccontent1)
      } else {
        assert.equal(type2, type);
        assert.equal(data, matriccontent2)
      }

      count++;
      if (count == 2) {
        done();
      }
    }

    var servicemock2 = new ServiceMock();
    servicemock2.type = "type" + Math.random();
    servicemock2.track = function(type, data) {
      if (type1 == type) {

        assert.equal(data, matriccontent1)
      } else {
        assert.equal(type2, type);
        assert.equal(data, matriccontent2)
      }

      count++;
      if (count == 2) {
        done();
      }
    }

    metricsmanager.registerService(servicemock1);
    metricsmanager.registerService(servicemock2);
    providermock1.writeMatric(matriccontent1);
    providermock2.writeMatric(matriccontent2);
  });

});

function ProviderMock() {

}
util.inherits(ProviderMock, EventEmitter);

ProviderMock.prototype.writeMatric = function(data) {
  this.emit('metrics', data);
};


function ServiceMock() {

}