var httpProxy = require('http-proxy');

exports.createLoadBalancer = function(config) {
    return httpProxy.createServer(function (req, res, proxy) {
    	var target = null;

    	var hostname = req.headers['host'];
        if (typeof config[hostname] == 'undefined') {
			var error = 'Unknown host: ' + hostname;
			console.error(error);
			res.writeHead(500);
			res.end(error);
			return;
    	}

        var pool = config[hostname];
        var target = pool.shift();
        pool.push(target);

    	proxy.proxyRequest(req, res, target);
    });
};
