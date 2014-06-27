var usage = require('usage');
var async = require('async');
var os = require('os');
var clusterObj = require('./clusters')();
module.exports = function() {
    var usageObj = {};

    usageObj.stats = function(callback) {
        async.map(clusterObj.processes, usageIterator, function(err, resultArr) {
            if (err) {
                console.log('err map' + err);
                callback(err);
            } else {
                var statsObj = {};
                statsObj.processStats = resultArr;
                statsObj.osStats = osStats();
                callback(null, statsObj);
            }
        });
    };

    function osStats() {
        var osObj = {};
        osObj.totalMem = os.totalmem();
        osObj.freeMem = os.freemem();
        osObj.cpus = os.cpus();
        osObj.loadAvg = os.loadavg();
        osObj.uptime = os.uptime();
        osObj.platform = os.platform();
        return osObj;

    }
    var options = {
        keepHistory: true
    };

    function usageIterator(pid, callback) {
        usage.lookup(pid, options, function(err, result) {
            if (err) {
                console.log('error iterator ' + err);
                console.log('error iterator ' + pid);
                callback(err);
            } else {
                var obj = {};
                obj['pid'] = pid;
                obj = merge_options(obj, result);
                callback(null, obj);
            }
        });
    }

    function merge_options(obj1, obj2) {
        var obj3 = {};
        for (var attrname in obj1) {
            obj3[attrname] = obj1[attrname];
        }
        for (var attrname in obj2) {
            obj3[attrname] = obj2[attrname];
        }
        return obj3;
    }
    return usageObj;

};