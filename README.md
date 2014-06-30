About
======

Cluster manager and process monitor for node.js applications.

Forkes multiple process depending on the number of cores available in the CPU.

Provides web api in json to track status, memory and cpu for individual node processes and for servers.


Usage
======

Format : node [path to this module index.js file] [arguments]


Arguments:

first argument - main filename of the application(file to start application)

second argument - no. of clusters (optional, deafult = no. of cpu - 1)

example : node ./node_modules/noderunner/index.js app.js


Hit 
====

http://localhost:5667/stats

To get metrics of all worker process

http://localhost:5667/status 

To get status of all worker process