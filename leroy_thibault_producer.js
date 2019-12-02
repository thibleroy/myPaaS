const kafka = require('kafka-node');
const Producer = kafka.Producer;
const client = new kafka.KafkaClient({kafkaHost: '148.60.11.202:9092'});
const producer = new Producer(client);
payloads = [
    { topic: 'thibtopic', messages: ['hello' + Date.now()] }
];
const sendMessage = () => {
    producer.send(
        payloads,
         (err, data) => {
             console.log('data', data);
         }
    )
};
producer.on('ready', function () {
    setInterval(sendMessage,1000);
});
