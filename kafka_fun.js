const producer = require('./instances').producer;
const consumer = require('./instances').consumer;

producer.on('ready', function () {
    console.log('ready')
    //setInterval(sendMessage,1000);
    //sendMessage(producer, 'thibtopic', JSON.stringify({action: 'list'}));
});

consumer.on('error', function (message) {
    console.log('error', message);
});

exports.sendMessage = (topic, message) => {
    producer.send(
        [
            { topic: topic, messages: message, timestamp: Date.now()}
        ],
        (err, data) => {
            console.log('data', data);
        }
    )
};
