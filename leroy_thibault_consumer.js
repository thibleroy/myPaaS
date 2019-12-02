const kafka = require('kafka-node');
const Consumer = kafka.Consumer;
const client = new kafka.KafkaClient({kafkaHost: '148.60.11.202:9092'});
const consumer = new Consumer(
        client,
        [
            { topic: 'thibtopic', partitions: 1, offset: 5}
        ],
    { autoCommit: false, fetchMaxWaitMs: 1000, fetchMaxBytes: 1024 * 1024 }
    );

consumer.on('message', function (message) {
    console.log('message', message);
});
consumer.on('error', function (message) {
    console.log('error', message);
});
