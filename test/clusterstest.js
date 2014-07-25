var express = require('express');
var assert = require('chai').assert;
var events = require("events");
var clusterObj;
var cluster = {};

describe('clusters tests', function() {

    var clusterObj = {};
    var cluster = {};
    var worker = {};

    beforeEach(function(done) {
        delete require.cache[require.resolve('../lib/clusters')];
        var clusters = require('../lib/clusters');

        worker.workerID = 1;
        worker.process = {
            pid: '3'
        };

        process.argv[2] = [1];
        process.argv[3] = 3;

        cluster.fork = function() {
            var tempClusterObj = {};
            tempClusterObj.workerID = '1';

            tempClusterObj.uniqueID = '1';
            tempClusterObj.process = {
                pid: '3'
            };
            return tempClusterObj;
        };
        cluster.setupMaster = function() {};
        cluster.on = function(eventType, callback) {
            if (eventType == 'online') {
                callback(worker);
            };
        }
        clusterObj = clusters(cluster);
        done();
    });

    it('should return cluster processes with status online', function(done) {
        var clusterResultObj = clusterObj.initialize();
        assert.equal(3, clusterResultObj.processes.length);
        assert.equal(1, clusterResultObj.status[1].workerID);
        assert.equal('ONLINE', clusterResultObj.status[1].status);
        done();
    });

    it('should fork again when disconnect event is called', function(done) {

        var disconnectEventCalled = false;
        cluster.on = function(eventType, callback) {
            console.log(eventType);
            if (eventType == 'disconnect') {
                callback(worker);
                disconnectEventCalled = true;
            }
        };
        var clusterResultObj = clusterObj.initialize();

        assert.equal(true, disconnectEventCalled);
        done();
    });

    it('should set status to died when exit event is called', function(done) {
        cluster.on = function(eventType, callback) {
            if (eventType == 'exit') {
                callback(worker, {}, {});
            }
        }

        var clusterResultObj = clusterObj.initialize();
        assert.equal('DIED', clusterResultObj.status[1].status);
        done();
    });

});