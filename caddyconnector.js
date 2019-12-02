const instances = require('./instances');
const caddyfun = require('./caddy_fun');

instances.consumer.on('message', function (message) {
    const parsed = JSON.parse(message.value);
    if (parsed.type === 'req') {
        switch (parsed.action) {
            case 'ready':
                switch (parsed)
                caddyfun.
                    break;
            default:
                break;
        }
    }
});


