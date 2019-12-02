const http = require('http');
const instances = require('./instances');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);
const kafkafun = require('./kafka_fun');
const topic = require('./instances').topic;
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.get('*', (req, res) => {
    res.sendFile(__dirname + '/client.html');
});

server.listen(12345, () => {
    console.log('listening 12345');
});

io.on('connection', function (socket) {
    socket.on('paas', function (data) {
        switch (data.action) {
            case 'start':
                kafkafun.sendMessage(topic, JSON.stringify({action: 'start', type: 'req', repository: data.repository, id: data.id}));
                break;
            case 'stop':
                kafkafun.sendMessage(topic, JSON.stringify({action: 'stop', type: 'req', id: data.id}));
                break;
            case 'list':
                kafkafun.sendMessage(topic, JSON.stringify({action: 'list', type: 'req'}));
                break;
            default: break;
        }
    });
    instances.consumer.on('message', function (message) {

        console.log(message);
        const parsed = JSON.parse(message.value);
        // console.log('parsed interface : ', parsed);
        if (parsed.type === 'res') {
            socket.broadcast.emit('paas_nomad', {type: parsed.action, value: parsed.value});
        }
    });
});

