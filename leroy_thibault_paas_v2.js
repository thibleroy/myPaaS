const instances = require('./instances');
const nomadfun = require('./nomad_fun');

instances.consumer.on('message', function (message) {
    const parsed = JSON.parse(message.value);
    if (parsed.type === 'req') {
        switch (parsed.action) {
            case 'start':
                nomadfun.createJob(parsed.repository, parsed.id);
                break;
            case 'stop':
                nomadfun.stopJob(parsed.id);
                console.log('parsed', parsed);
                break;
            case 'list':
                nomadfun.listJobs();
                break;
            default:
                break;
        }
    }
});
instances.producer.on('ready', function () {
    console.log('ready');
    setInterval(nomadfun.listJobs, 3000);
});

