#!/bin/bash

cd /var/www/html/openWB
git pull origin master:master
cd /var/www/html/
sudo chown -R pi:pi openWB 
chmod 777 /var/www/html/openWB/openwb.conf
chmod +x /var/www/html/openWB/modules/*                     
chmod +x /var/www/html/openWB/runs/*
chmod 777 /var/www/html/openWB/web/lade.log

