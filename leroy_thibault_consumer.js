const instances = require('./instances');
instances.consumer.on('message', (message) => {
    if (message.offset > instances.lastOffset) {
        console.log('message :', message);
    }
});
