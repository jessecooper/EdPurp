EdPurp is a nodejs/mongodb project for hosting a private torrent site. 
It is currently not very functional. 

Updates:
Current Scema change to be more generic with torrent uploads. 

## TODO (6)
1. app.js:52  Enable secure cookies for https
2. index.js:35  check req.user.admin to see if page should be displayed.
3. index.js:49  Query homepage results
4. upload.js:7  express deprecated req.param(name): Use req.params, req.body, or req.query instead
5. upload.js:31  express deprecated req.param(name): Use req.params, req.body, or req.query instead
6. upload.jade:19  Use Angular to make the form selection dynamic

## Install
1. git clone https://github.com/jessecooper/EdPurp
2. cd ~/EdPurp
3. npm install 
4. Edit db.js: MongoDB connection string.
5. mongoimport --db [dbname] --collection users --file epadmin.json
6. rm ./epadmin.json

## Run Site
* sh debug.sh
* http://localhost:3000/
* Login: epadmin Password: EpAdmin
