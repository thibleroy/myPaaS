const sendMessage = require('./kafka_fun').sendMessage;
const http = require('http');
const deployTaskJson = require('./instances').deployTaskJson;
const NomadDeleteConf = require('./instances').NomadDeleteConf;
const NomadGetConf = require('./instances').NomadGetConf;
const NomadPostConf = require('./instances').NomadPostConf;
exports.createJob = (repo, id) => {
    deployTaskJson.Job.TaskGroups[0].Tasks[0].Config.args[0] = repo;
    deployTaskJson.Job.ID = id;
    deployTaskJson.Job.Name = id;
    const job = http.request(NomadPostConf, res => {
        let bodyrun = "";
        res.on('data', data => {
            bodyrun += data;
        });
        res.on('end', () => {
            sendMessage( 'paas_nomad', {
                type: 'res',
                action: 'start',
                value: bodyrun
            });
        });
    });
    job.write(JSON.stringify(deployTaskJson));
    job.end();
};
exports.stopJob = (id) => {
    NomadDeleteConf.path = '/v1/job/' + id;
const stopjob = http.request(NomadDeleteConf, res => {
    let bodyrun = "";
    res.on('data', data => {
        bodyrun += data;
    });
    res.on('end', () => {
        console.log(bodyrun);
        sendMessage( 'paas_nomad', {
            type: 'res',
            action: 'stop',
            value: bodyrun
        });
    });
});
    stopjob.write('');
    stopjob.end();
};

exports.listJobs = () => {
    http.get(NomadGetConf, (res) => {
        let data = '';
        res.on('data', buff => data+= buff);
        res.on('end', () => {
            const myNodes = [];
            JSON.parse(data).forEach((node) => {
                if (node.Name.includes('thib')) {
                    myNodes.push(JSON.stringify(node));
                }
            });
            sendMessage( require('./instances').topic, JSON.stringify({
                type: 'res',
                action: 'list',
                value: myNodes
            }))
        })
    });
};

exports.getJobInfos = (id) => {
    NomadGetConf.path = '/v1/job/' + id + '/allocations';
    const stopjob = http.request(NomadDeleteConf, res => {
        let bodyrun = "";
        res.on('data', data => {
            bodyrun += data;
        });
        res.on('end', () => {
            console.log(bodyrun);
            sendMessage( 'paas_nomad', {
                type: 'res',
                action: 'stop',
                value: bodyrun
            });
        });
    });
    stopjob.write('');
    stopjob.end();
};

exports.getAllocJob = (id) => {
    NomadDeleteConf.path = '/v1/allocation/' + id;
    const stopjob = http.request(NomadDeleteConf, res => {
        let bodyrun = "";
        res.on('data', data => {
            bodyrun += data;
        });
        res.on('end', () => {
            console.log(bodyrun);
            sendMessage( 'paas_nomad', {
                type: 'res',
                action: 'stop',
                value: bodyrun
            });
        });
    });
    stopjob.write('');
    stopjob.end();
};
