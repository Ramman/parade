var express = require('express');
var assert = require('chai').assert;
var usageObj = require('../lib/usage');
var clustersObj = {};
var usage = {};
var os = {};

describe('Usage Get stats tests', function(){
    mockDependencies();
    it('should return stats', function(done) {
        usage.lookup = function(pid, options, callback){
            callback(null, {});
        }
        var usageTest = usageObj(usage, os, clustersObj);
        usageTest.stats(function(err, stats) {
            if(!err) {
                assert.equal(clustersObj.processes.length, stats.processStats.length);
                assert.equal(clustersObj.processes[0], stats.processStats[0].pid);
                assert.equal(os.totalmem(), stats.osStats.totalMem);
                assert.equal(os.freemem(), stats.osStats.freeMem);
            } else {
            }
            done();
        });
    });

    it('should return error', function(done) {
        var errorMessage = "Error message";
        usage.lookup = function(pid, options, callback){
            callback(errorMessage, {});
        }
        var usageTest = usageObj(usage, os, clustersObj);
        usageTest.stats(function(err, stats) {
            if(!err) {
            } else {
                assert.equal(errorMessage, err);
            }
            done();
        });
    });
});

function mockDependencies(){

    clustersObj.processes = ['1','2'];

    os.totalmem = function(){
        return 400;
    };
    os.freemem = function(){
        return 130;
    };
    os.cpus = function(){
        return "Intel(R)";
    };
    os.loadavg = function(){
        return 0;
    };
    os.uptime = function(){
        return 1;
    };
    os.platform = function(){
        return "windows";
    };
}