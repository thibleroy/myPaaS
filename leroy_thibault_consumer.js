const kafka = require('kafka-node');
var consumerClient = new kafka.KafkaClient({kafkaHost: '148.60.11.202:9092'});

/* Print latest offset. */
var offset = new kafka.Offset(consumerClient);

offset.fetchLatestOffsets(['thibtopic'], (error, offsets) => {
    const latestOffset = offsets['thibtopic'][0];
    consumer.setOffset('thibtopic', 0, latestOffset);
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
