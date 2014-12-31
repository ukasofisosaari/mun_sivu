#Script for setting up node.js and automatic running of the webpage.
#Run as sudo

install=1

if [ $install -eq 0 ]
then
    #Install node.js
    wget http://nodejs.org/dist/v0.10.35/node-v0.10.35.tar.gz
    tar -xzf node-v0.10.35.tar.gz
    cd node-v0.10.35
    ./configure
    make
    make install
fi

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
npm -g install node-static forever

cp nodejs_server_startup.sh /etc/init.d/.
chmod u+x /etc/init.d/nodejs_server_startup.sh
/etc/init.d/nodejs_server_startup.sh start

#Reboot server
sudo reboot
