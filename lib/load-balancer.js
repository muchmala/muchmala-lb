var httpProxy = require('http-proxy');

exports.createLoadBalancer = function(frontendHostname, staticHostname, frontends, statics) {
    return httpProxy.createServer(function (req, res, proxy) {
    	var target = null;

    	var hostname = req.headers['host'];
    	switch (hostname) {
    		case frontendHostname:
    			target = frontends.shift();
    			frontends.push(target);
    			break;

    		case staticHostname:
    			target = statics.shift();
    			statics.push(target);
    			break;

    		default:
    			var error = 'Unknown host: ' + hostname;
    			console.error(error);
    			res.writeHead(500);
    			res.end(error);
    			return;
    	}

    	proxy.proxyRequest(req, res, target);
    });
};
