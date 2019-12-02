const kafka = require('kafka-node');
const Consumer = kafka.Consumer;
const client = new kafka.KafkaClient({kafkaHost: '148.60.11.202:9092'});
const consumer = new Consumer(
    client,
    [
        { topic: this.topic, partitions: 1, fromOffset: -1}
    ],
    {autoCommit: false}
);

consumer.on('message', function (message) {
    console.log('message', message);
});
consumer.on('error', function (message) {
    console.log('error', message);
});
