#!/bin/bash
# prepare for some BASH magic!
LOGFILE="${MUCHMALA_LB_LOGDIR:-"/var/log/muchmala-lb"}"/daemon.log
nohup ./bin/muchmala-lb.js "$@" > $LOGFILE < /dev/null 2>&1 &
