# Node Runner

Node runner is a cluster manager and also a process monitor for node.js applications.
It forks multiple processes based on the number of cores available in the CPU
and provides restful endpoints that provide data to track status, memory and cpu for individual node processes and servers.

## Contributors
* Prasanna Ramanujam <pramanujam@ancestry.com>

## Get it

    $ npm install noderunner --save-dev

## Use it
### Format:

    $ node <index.js> <app.js> [clusters]

### Arguments:

* index.js :  the path to the index.js file of this library
* app.js: the main js file of your application
* clusters (optional): # of clusters to fork. By default, it is set to (# of cores - 1)

### Examples:

#### In your application
    $ node ./node_modules/noderunner/index.js app.js
    $ node ./node_modules/noderunner/index.js app.js 3

#### To run an example in this module
    $ node index.js ./example/app.js
    $ node index.js ./example/app.js 2

    Argument 2, worker file name: ./example/app.js
    Number of process forks  : 3
    node runner web api server running in 5667
    Worker is online, Worker ID :  1
    Worker is online, Worker ID :  2
    Worker is online, Worker ID :  3

## Test it
    $ npm install
    $ npm test

## Rest Endpoints

### Stats
It gets metrics of all worker processes

#### endpoint
    http://{yourhost}/stats

#### data
    {
      "processStats": [
        {
          "pid": 12335,
          "memory": 39047168,
          "cpu": 0
        },
        {
          "pid": 12337,
          "memory": 42954752,
          "cpu": 0
        }
      ],
      "osStats": {
        "totalMem": 4009091072,
        "freeMem": 1395204096,
        "cpus": [
          {
            "model": "Intel(R) Xeon(R) CPU E5-2670 0 @ 2.60GHz",
            "speed": 2599,
            "times": {
              "user": 125852300,
              "nice": 334700,
              "sys": 59101600,
              "idle": 108351690500,
              "irq": 54764100
            }
          },
          {
            "model": "Intel(R) Xeon(R) CPU E5-2670 0 @ 2.60GHz",
            "speed": 2599,
            "times": {
              "user": 57877800,
              "nice": 343100,
              "sys": 31694400,
              "idle": 108823011800,
              "irq": 0
            }
          }
        ],
        "loadAvg": [
          0,
          0,
          0
        ],
        "uptime": 10986836.192939406,
        "platform": "linux"
      }
    }

### Status
It gets the status of all worker processes

#### Endpoint
    http://{yourhost}/status

#### Data
    {
      "1": {
        "workerID": 1,
        "uniqueID": 1,
        "process": 12335,
        "status": "ONLINE"
      },
      "2": {
        "workerID": 2,
        "uniqueID": 2,
        "process": 12337,
        "status": "ONLINE"
      }
    }

## License

[The MIT License](http://opensource.org/licenses/MIT)
