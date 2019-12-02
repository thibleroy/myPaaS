const sendMessage = require('./kafka_fun').sendMessage;
const http = require('http');
const CaddyGetConf = require('./instances').CaddyGetConf;
const CaddyDeleteConf = require('./instances').CaddyDeleteConf;
const CaddyPostConf = require('./instances').CaddyPostConf;
exports.addProxyConfig = (ip, port, domain, id) => {
    const proxyConf = require('./instances').proxyConf;
    proxyConf.@id = id;
    proxyConf.match[0].host[0] = domain;
    proxyConf.handle[0].routes[0].handle[0].upstreams[0].dial = `${ip}:${port}`
    const add = http.request(CaddyPostConf, (res) => {
        let data = '';
        res.on('data', buff => data+= buff);
        res.on('end', () => {
            const parsed = JSON.parse(data);
            sendMessage( require('./instances').topic, {
                type: 'res',
                action: 'ready',
                value: data
            });
        });
    });
    add.write(proxyConf);
    add.end();
};
exports.getProxyConfig = (id) => {
    CaddyGetConf.path = '/id/' + id;
    http.get(CaddyGetConf, (res) => {
        let data = '';
        res.on('data', buff => data+= buff);
        res.on('end', () => {
            const parsed = JSON.parse(data);
            sendMessage( require('./instances').topic, JSON.stringify({
                type: 'res',
                action: 'ready',
                value: add
            }))
        })
    })
};
exports.deleteProxyConfig = (id) => {
    CaddyDeleteConf.path = '/id/' + id;
const deletec = http.request(CaddyDeleteConf, (res) => {
        let data = '';
        res.on('data', buff => data+= buff);
        res.on('end', () => {
            const parsed = JSON.parse(data);
            sendMessage( require('./instances').topic, {
                type: 'res',
                action: 'ready',
                value: add
            });
        });
});
deletec.write('');
deletec.end();
};
