const kafka = require('kafka-node');
const client = new kafka.KafkaClient({kafkaHost: '148.60.11.202:9092'});
const Consumer = kafka.Consumer;
exports.Consumer = kafka.Consumer;
const fs = require('fs');
const Producer = kafka.Producer;
const deployTaskdata = fs.readFileSync('thib_paas_task.json', 'utf8');
const producer = new Producer(client);
const topic = 'thibtopic';
const NomadConf = {
    hostname: '148.60.11.202',
    path: '/v1/jobs',
    port: 4646,
    headers: {
        'Content-Type': 'application/JSON',
    }
};
const CaddyConf = {
    hostname: '148.60.11.202',
    port: 2019,
    headers: {
        'Content-Type': 'application/JSON',
    }
};
const consumer = new Consumer(
    client,
    [
        { topic: topic, partitions: 1, fromOffset: 'latest'}
    ],
    {autoCommit: false}
);
const offset = new kafka.Offset(client);

const p = new Promise((resolve) => {
    offset.fetchLatestOffsets([topic], function (error, offsets) {
        resolve(offsets[topic][0]);
    });
});
p.then((offset) => {
    console.log('offset', offset);
    exports.lastOffset = offset
});
exports.client = client;
exports.Consumer = Consumer;
exports.producer = producer;
exports.NomadDeleteConf = {...NomadConf, method: 'DELETE'};
exports.NomadPostConf = {...NomadConf, method: 'POST'};
exports.NomadGetConf = {...NomadConf, method: 'GET'};
exports.deployTaskJson = JSON.parse(deployTaskdata);
exports.proxyConf = {"@id": "", match: [{host: [""]}], handle: [{handler: "subroute", routes: [{handle: [{handler: "reverse_proxy", upstreams: [{dial: ""}]}], match: [{path: ["/"]}]}]}]};
exports.topic = topic;
exports.consumer = consumer;
exports.CaddyPostConf = {...CaddyConf, method: 'POST', path: '/config/apps/http/servers/main/routes'};
exports.CaddyGetConf = {...CaddyConf, method: 'GET'};
exports.CaddyDeleteConf = {...CaddyConf, method: 'DELETE'};
