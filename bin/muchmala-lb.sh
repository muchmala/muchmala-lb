#!/bin/bash
MUCHMALA_LB_LOGDIR="${MUCHMALA_LB_LOGDIR:-"/var/log/muchmala-lb"}"
if [ ! -d "$MUCHMALA_LB_LOGDIR" ]; then
	mkdir -p "$MUCHMALA_LB_LOGDIR"
fi

LOGFILE="${MUCHMALA_LB_LOGDIR}"/daemon.log
nohup ./bin/muchmala-lb.js "$@" >> $LOGFILE < /dev/null 2>&1 &
