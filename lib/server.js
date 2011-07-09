var LoadBalancer = require('./load-balancer');

if (!process.env.MUCHMALA_LB_CONFIG) {
	console.error('Environment variable MUCHMALA_LB_CONFIG is not defined, falling back to default config.');
	process.env.MUCHMALA_LB_CONFIG = '{"muchmala.dev":[{"host":"127.0.0.1","port":8000}],"static.muchmala.dev":[{"host":"127.0.0.1","port":8080}],"io.muchmala.dev":[{"host":"127.0.0.1","port":8090}]}';
	//process.exit(1);
}

var config = null;
try {
    config = JSON.parse(process.env.MUCHMALA_LB_CONFIG);
} catch (e) {
    console.error('Error parsing config: ', e.stack);
    process.exit(1);
}

module.exports = LoadBalancer.createLoadBalancer(config);
