var clusters = require('./lib/clusters');

var httpApi = require('./lib/http_api');

var usage = require('./lib/usage');

var cluster = require("cluster");

var clusterObj = clusters(cluster);

if (clusterObj.validateInput(process.argv[2])) {
    clusterObj.initialize();
    httpApi();
    usage();
}