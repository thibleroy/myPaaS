const instances = require('./instances');
const fs = require('fs');
const myApps = [];
const consumer = new instances.Consumer(
    instances.client,
    [
        { topic: this.topic, partitions: 1}
    ],
    {autoCommit: false}
);
consumer.on('message', function (message) {
    console.log(message);
    const parsed = JSON.parse(message.value);
    // console.log('parsed interface : ', parsed);
    switch (parsed.type) {
        case 'req':
            switch (parsed.action) {
                case 'start':
                    myApps.push({repository: parsed.repository, id: parsed.id, timestamp: message.timestamp});
                    break;
                case 'stop':
                    const uptime = message.timestamp - myApps.find( app => app.id === parsed.id).timestamp;
                    const price = uptime/60000;
                    fs.writeFileSync( `FACTURE-${parsed.id}.log` , `FACTURE-${message.timestamp},${parsed.repository},${uptime},${price}`)
                    break;
                default: break;
            }
            break;
        default:break;
    }
});

const log = () => console.log(myApps);
setInterval(log, 1000);
