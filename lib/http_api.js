module.exports = function() {

    var express = require('express');
    var async = require('async');
    var clusterObj = require('./clusters')();
    var usage = require('usage');
    var os = require('os');

    var usageObj = require('./usage.js')(usage, os, clusterObj);

    var app = express();
    app.listen(5667);
    console.log('node runner web api server running in 5667');

    app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        next();
    });

    app.get('/', function(req, res) {
        res.send('hello from node runner');
    });
    app.get('/status', function(req, res) {
        res.send(clusterObj.status);
    });

    app.get('/process', function(req, res) {
        res.send(clusterObj.processes);
    });

    app.get('/stats', function(req, res) {
        usageObj.stats(function(err, resultArr) {
            if (err) {
                res.send(500, err);
            } else {
                res.send(resultArr);
            }
        })
    });
};
