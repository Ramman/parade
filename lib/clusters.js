var _cluster;
var workerObj = {};
var processesArr = [];
module.exports = function(cluster) {
    var clusterObj = {};
    var tempClusterObj = {};
    var workerID;

    if (!_cluster) {
        _cluster = true;
        if (!process.argv[2]) {
            console.log('Pass worker file name in 2nd argument');
            return;
        }
        console.log('Argument 2, worker file name: ' + process.argv[2]);

        cluster.setupMaster({
            exec: process.argv[2]
        });

        var numCPUs = Number(process.argv[3]) || (require('os').cpus().length);
        console.log('Number of process forks  : ' + numCPUs);

        // Fork workers.
        for (var i = 0; i < numCPUs; i++) {
            forkWorker();
        }

        function forkWorker() {
            tempClusterObj = cluster.fork();
            workerID = tempClusterObj.workerID;
            workerObj[workerID] = {};
            workerObj[workerID]['workerID'] = tempClusterObj.workerID;
            workerObj[workerID]['uniqueID'] = tempClusterObj.uniqueID;
            workerObj[workerID]['process'] = tempClusterObj.process.pid;
            workerObj[workerID]['status'] = tempClusterObj.process.pid;
            processesArr.push(tempClusterObj.process.pid);
        }

        cluster.on('online', function(worker) {
            console.log('Worker is online, Worker ID :  ' + worker.workerID);
            if (workerObj[worker.workerID]) {
                workerObj[worker.workerID]['status'] = 'ONLINE';
            } else {
                console.log('Worker ID not found ' + worker.workerID);
            }
        });

        cluster.on('disconnect', function(worker) {
            console.log('worker disconnected!');
            if (workerObj[worker.workerID]) {
                workerObj[worker.workerID]['status'] = 'DISCONNECTED';
            } else {
                console.log('Worker ID not found ' + worker.workerID);
            }
            var i = processesArr.indexOf(workerObj[worker.workerID].process);
            if (i != -1) {
                processesArr.splice(i, 1);
                console.log('Process id ' + workerObj[worker.workerID].process + ' removed');
            }

            console.log('Forking new worker .. ');
            //cluster.fork();
            forkWorker();
        });

        cluster.on('exit', function(worker, code, signal) {
            console.log('worker ' + worker.process.pid + ' died');
            if (workerObj[worker.workerID]) {
                workerObj[worker.workerID]['status'] = 'DIED';
            } else {
                console.log('Worker ID not found ' + worker.workerID);
            }
        });
    }

    clusterObj.status = workerObj;
    clusterObj.processes = processesArr;
    return clusterObj;

};