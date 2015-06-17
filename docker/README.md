## Docker Build Files
1. Copy start.sh to your location of choice in the container.
2. Edit your db.js
3. docker build -t edpurp .
4. sudo docker run --name edpurp --link edpurpdb:edpurpdb -d -p 3000:3000 edpurp /usr/src/edpurp/start.sh
