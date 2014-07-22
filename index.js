var clusters = require('./lib/clusters');

var httpApi = require('./lib/http_api');

var usage = require('./lib/usage');

var cluster = require("cluster");

clusters();
httpApi();
usage();