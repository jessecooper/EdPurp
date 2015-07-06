EdPurp is a nodejs/mongodb project for hosting a private torrent site. 
It is currently not ready for production. 

## Updates:
1. Enabled HTTPS by default
2. Added Docker build files
3. Added dynamic type selection to upload page

## Install
1. git clone https://github.com/jessecooper/EdPurp
2. cd ~/EdPurp
3. sh install.sh 
4. Edit db.js: MongoDB connection string.
5. mongoimport --db [dbname] --collection users --file epadmin.json
6. rm ./epadmin.json (if running in production)
7. place your own ssl certs in the sslcert/ directory (if running in production)

## Run Site
* Dev: sh debug.sh Prod:./bin/www
* https://localhost:3000/
* Login: epadmin Password: EpAdm1n!
