#!/usr/bin/env node

var fs = require('fs'),
    path = require('path');

var host = process.env.MUCHMALA_LB_HOST || '0.0.0.0';
var port = process.env.MUCHMALA_LB_PORT || 80;
var piddir = process.env.MUCHMALA_LB_PIDDIR || '/var/run/muchmala-lb';
var logdir = process.env.MUCHMALA_LB_LOGDIR || '/var/log/muchmala-lb';

if (!path.existsSync(logdir)) {
    console.error('Logfiles directory doesn\'t exsist, creating:', logdir);
    fs.mkdirSync(logdir, 0755);
}

if (!path.existsSync(piddir)) {
    console.error('Pidfiles directory doesn\'t exsist, creating:', piddir);
    fs.mkdirSync(piddir, 0755);
}

var cluster = require('cluster');
cluster('../lib/server')
    .set('socket path', piddir)
    .use(cluster.logger(logdir))
    .use(cluster.pidfiles(piddir))
    .use(cluster.cli())
    .listen(port, host);
