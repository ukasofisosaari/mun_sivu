### BEGIN INIT INFO
# Provides:              nodejs_server_startup
# Required-Start:    $remote_fs $named $syslog
# Required-Stop:     $remote_fs $named $syslog
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Short-Description: Script for stopping and starting nodejs server
# Description:       This script was created to automate the starting of node.js server using forever when restarting pi.
### END INIT INFO

#!/bin/bash

PATH=$PATH:/sbin:/usr/sbin:/bin:/usr/bin:/usr/local/bin
NODESCRIPT=/home/pi/mun_sivu/

case "$1" in
  start)
    # The -A indicates, adding of this rule
    sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 8000
    sudo iptables -t nat -A PREROUTING -i wlan0 -p tcp --dport 80 -j REDIRECT --to-port 8000
    sudo -u pi forever start $NODESCRIPT/server.js
    ;;
  stop)
    sudo -u pi forever stop $NODESCRIPT/server.js
    # The -D indicates, deleting of this rule
    sudo iptables -t nat -D PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 8000
    sudo iptables -t nat -D PREROUTING -i wlan0 -p tcp --dport 80 -j REDIRECT --to-port 8000
    ;;
  *)

  echo "Usage: /etc/init.d/nodejs_server_startup.sh {start|stop}"
  exit 1
  ;;
esac
exit 0
