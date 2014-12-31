#Script for setting up node.js and automatic running of the webpage.
#Run as sudo

#Install node.js
wget http://nodejs.org/dist/v0.10.35/node-v0.10.35.tar.gz
tar -xzf node-v0.10.35.tar.gz
cd node-v0.10.35
./configure
make
make install

#Check version, that it installed correctly
version=$(node -v 2>&1)
should_be="v0.10.35"
if [ $version != $should_be ]
then
    
    echo "Node.js did not install correctly. Try to install manually"
    echo "Node.js version found is $version"
    exit 1
else
    cd ..
    rm node-v0.10.35* -rf
fi

#Install node.js modules needed
npm -g install node-static


#Redirect port 80 to 8000
sudo iptables -A PREROUTING -t nat -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 8000
sudo service iptables save

#Add start script to startup
cat <<EOF > /etc/rc.local
#!/bin/sh -e
#
# rc.local
#
# This script is executed at the end of each multiuser runlevel.
# Make sure that the script will "exit 0" on success or any other
# value on error.
#
# In order to enable or disable this script just change the execution
# bits.
#
# By default this script does nothing.

# Print the IP address
_IP=$(hostname -I) || true
if [ "$_IP" ]; then
  printf "My IP address is %s\n" "$_IP"
fi

node /home/pi/mun_sivu/server.js

exit 0
EOF

#Reboot server
sudo reboot
