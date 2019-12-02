const kafka = require('kafka-node');
var consumerClient = new kafka.KafkaClient({kafkaHost: '148.60.11.202:9092'});

/* Print latest offset. */
var offset = new kafka.Offset(consumerClient);

offset.fetchLatestOffsets(['thibtopic'], function (error, offsets) {
    console.log(offsets['thibtopic'][0]);
});
var consumer = new kafka.Consumer(
    consumerClient,
    [
        { topic: 'thibtopic', partition: 0}
    ],
    {
        autoCommit: false
    }
);
consumer.on('message', (message) => {
    console.log('message :', message);
});
