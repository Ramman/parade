var express = require('express');
var assert = require('chai').assert;
var events = require("events");
var clusterObj;
var cluster = {};

describe('cluster `tests', function(){

    it('should return cluster processes with status online', function(done) {
        mockDependencies();
        var worker = {};
        worker.workerID = 1;
        worker.process = { pid: '3' };
        cluster.on = function(eventType, callbackfn){
            if(eventType == 'online')
            {
                callbackfn(worker);
            }
        }

        var result = clusterObj(cluster);
        assert.equal(1, result.processes.length);
        assert.equal(1, result.status[1].workerID);
        assert.equal('ONLINE', result.status[1].status);
        done();
    });

    it('should fork again when disconnect event is called', function(done) {
        mockDependencies();
        var worker = {};
        worker.workerID = 1;
        worker.process = { pid: '3' };

        var disconnectEventCalled = false;
        cluster.on = function(eventType, callbackfn){
            if(eventType == 'disconnect')
            {
                callbackfn(worker);
                disconnectEventCalled = true;
            }
        }

        var result = clusterObj(cluster);
        assert.equal(3, result.status[1].status);
        assert.equal(true, disconnectEventCalled);
        done();
    });

    it('should set status to died when exit event is called', function(done) {
        mockDependencies();
        var worker = {};
        worker.workerID = 1;
        worker.process = { pid: '3' };
        cluster.on = function(eventType, callbackfn){
            if(eventType == 'exit')
            {
                callbackfn(worker, {}, {});
            }
        }

        var result = clusterObj(cluster);
        assert.equal('DIED', result.status[1].status);
        done();
    });
});

function mockDependencies(){
    delete require.cache[require.resolve('../lib/clusters')];
    clusterObj = require('../lib/clusters');
    process.argv = [1,1, 1, 1];

    cluster.fork = function(){
        var tempClusterObj = {};
        tempClusterObj.workerID = '1';
        tempClusterObj.uniqueID = '1';
        tempClusterObj.process = { pid: '3' };
        return tempClusterObj;
    }

    cluster.setupMaster = function(){ }
}