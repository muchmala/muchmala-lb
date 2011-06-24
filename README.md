muchmala-lb
===========

This is the load balancer for Muchmala.

It's configured to proxy incoming requests to the pool of frontend and static servers.

## Configuration

This application is configured using environment variables.

* `MUCHMALA_LB_HOST` - host to bind to, default is `0.0.0.0`.
* `MUCHMALA_LB_PORT` - port to bind to, default is `80`.
* `MUCHMALA_LB_FRONTEND_HOSTNAME` - DNS name of the frontend server, e.g. `muchmala.com`.
* `MUCHMALA_LB_STATIC_HOSTNAME` - DNS name of the static server (used only for development), e.g. `static.muchmala.com`.
* `MUCHMALA_LB_FRONTENDS` - comma-separated list of frontend servers, e.g. `127.0.0.1:8000,127.0.0.1:8001`.
* `MUCHMALA_LB_STATICS` - comma-separated list of static servers (used only for development), e.g. `127.0.0.1:8080,127.0.0.1:8081`.

## Usage

    [sudo] muchmala-io
