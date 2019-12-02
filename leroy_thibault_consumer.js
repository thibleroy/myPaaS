const instances = require('./instances');
instances.consumer.on('message', (message) => {
    console.log('lastoffset', instances.lastOffset);
    if (message.offset > instances.lastOffset) {
        console.log('message :', message);
    }
});
