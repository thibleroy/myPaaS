const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');

app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.get('*', (req, res) => {
    const html = fs.readFileSync('client.html', 'utf8');
    res.send(html);
});
const conf = {
    hostname: '148.60.11.202',
    method: 'POST',
    path: '/v1/jobs',
    port: 4646,
    headers: {
        'Content-Type': 'application/JSON',
    },
};
const data = fs.readFileSync('thib_paas_task.json', 'utf8');
const json = JSON.parse(data);
app.post('/form', (req) => {
    json.Job.TaskGroups[0].Tasks[0].Config.args[0] = req.body.message;
    const job = http.request(conf, res => {
        let bodyrun = "";
        res.on('data', data => {
            bodyrun += data;
        });
        res.on('end', () => {
            console.log('data', bodyrun);
        });
    });
    console.log(req.body);
    job.write(JSON.stringify(json));
    job.end();
});

app.listen(12345, () => console.log('listening 12345'));
