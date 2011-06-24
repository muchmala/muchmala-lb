#!/usr/bin/env node
var LoadBalancer = require('../lib/load-balancer');

var host = process.env.MUCHMALA_LB_HOST || '0.0.0.0';
var port = process.env.MUCHMALA_LB_PORT || 80;

console.log(process.env.MUCHMALA_LB_CONFIG);

if (!process.env.MUCHMALA_LB_CONFIG) {
	console.error('Environment variable MUCHMALA_LB_CONFIG is not defined.');
	process.exit(1);
}

var config = null;
try {
    config = JSON.parse(process.env.MUCHMALA_LB_CONFIG);
} catch (e) {
    console.error('Error parsing config: ', e.stack);
    process.exit(1);
}

var loadBalancer = LoadBalancer.createLoadBalancer(config);
loadBalancer.listen(port, host);
console.log('Load balancer started on ' + host + ':' + port);
