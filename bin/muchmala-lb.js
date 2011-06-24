#!/usr/bin/env node
var LoadBalancer = require('../lib/load-balancer');

var host = process.env.MUCHMALA_LB_HOST || '0.0.0.0';
var port = process.env.MUCHMALA_LB_PORT || 80;

if (!process.env.MUCHMALA_LB_FRONTEND_HOSTNAME) {
	console.error('Environment variable MUCHMALA_LB_FRONTEND_HOSTNAME is not defined.');
	process.exit(1);
}

if (!process.env.MUCHMALA_LB_STATIC_HOSTNAME) {
	console.error('Environment variable MUCHMALA_LB_STATIC_HOSTNAME is not defined.');
	process.exit(1);
}

var frontendHostname 	= process.env.MUCHMALA_LB_FRONTEND_HOSTNAME;
var staticHostname 		= process.env.MUCHMALA_LB_STATIC_HOSTNAME;

if (!process.env.MUCHMALA_LB_FRONTENDS) {
	console.error('Environment variable MUCHMALA_LB_FRONTENDS is not defined.');
	process.exit(1);
}

if (!process.env.MUCHMALA_LB_STATICS) {
	console.error('Environment variable MUCHMALA_LB_STATICS is not defined.');
	process.exit(1);
}

var frontends 	= parseServerList(process.env.MUCHMALA_LB_FRONTENDS);
var statics 	= parseServerList(process.env.MUCHMALA_LB_STATICS);

console.log('Frontend Hostname:', frontendHostname);
console.log('Static Hostname:', staticHostname);
console.log('Frontend Servers: ', frontends);
console.log('Static Servers: ', statics);

var loadBalancer = LoadBalancer.createLoadBalancer(frontendHostname, staticHostname, frontends, statics);
loadBalancer.listen(port, host);
console.log('Load balancer started on ' + host + ':' + port);



function parseServerList(rawServerList) {
	var servers = rawServerList.split(',');
	for (var k in servers) {
		var server = servers[k].split(':');
		if (!server[1]) {
			server[1] = 80;
		}
		servers[k] = {
			host: server[0],
			port: server[1]
		}
	}
	return servers;
}