var http = require('http'),
    httpProxy = require('http-proxy'),
    proxy = new httpProxy.HttpProxy();

exports.createLoadBalancer = function(config) {
    function getNextTarget(hostname) {
        hostname = normalizeHostname(hostname);

        if (typeof config[hostname] == 'undefined') {
            throw new Error('Unknown host: ' + hostname);
        }

        var pool = config[hostname];
        var target = pool.shift();
        pool.push(target);
        return target;
    }

    var server = http.createServer(function (req, res) {
        try {
            var target = getNextTarget(req.headers['host']);
            console.log('Proxying request to ', target);
            proxy.proxyRequest(req, res, target);
        } catch (e) {
			console.error(e.stack);
			res.writeHead(500);
			res.end(e.message);
			return;
        }
    });

    server.on('upgrade', function (req, socket, head) {
        try {
            var target = getNextTarget(req.headers['host']);
            console.log('Proxying websocket to ', target);
            proxy.proxyWebSocketRequest(req, socket, head, target);
        } catch (e) {
			console.error(e.stack);
			socket.end();
			return;
        }
    });

    return server;
};

function normalizeHostname(hostname) {
    if (hostname.substr(-3) == ':80') {
        hostname = hostname.substr(0, hostname.length - 3);
    }
    return hostname;
}
