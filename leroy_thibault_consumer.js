const kafka = require('kafka-node');
var consumerClient = new kafka.Client({kafkaHost: '148.60.11.202:9092'});

/* Print latest offset. */
var offset = new kafka.Offset(consumerClient);

offset.fetch([{ topic: 'thibtopic', partition: 0, time: -1 }], function (err, data) {
    var latestOffset = data['myTopic']['0'][0];
    console.log("Consumer current offset: " + latestOffset);
});

var consumer = new kafka.HighLevelConsumer(
    consumerClient,
    [
        { topic: 'myTopic', partition: 0, fromOffset: -1 }
    ],
    {
        autoCommit: false
    }
);
consumer.on('message', (message) => {
    console.log('message :', message);
})
