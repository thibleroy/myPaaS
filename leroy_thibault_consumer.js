const instances = require('./instances');

instances.consumer.on('message', function (message) {
    console.log('message', message);
});
instances.consumer.on('error', function (message) {
    console.log('error', message);
});

