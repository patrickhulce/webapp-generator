#!/bin/bash

apt-get update
apt-get install -y nginx
rm /etc/nginx/sites-enabled/default
cp /vagrant/misc/nginx.conf /etc/nginx/sites-enabled/default
service nginx restart