#!/bin/bash

apt-get update
apt-get install -y nginx mysql-server redis-server
rm /etc/nginx/sites-enabled/default
cp /vagrant/misc/nginx.conf /etc/nginx/sites-enabled/default
service nginx restart