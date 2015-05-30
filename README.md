EdPurp is a nodejs/mongodb project for hosting a private torrent site. 
It is currently not very functional. 

Updates:
Current Scema change to be more generic with torrent uploads. 

+ ---------------------------------------------------------------------------- +
| TODOS @ Saturday 30 May 2015 14:54                                           |
| 7 files scanned                                                              |
+ ---------------------------------------------------------------------------- +

## TODO (6)
1. app.js:52  Enable secure cookies for https
2. index.js:35  check req.user.admin to see if page should be displayed.
3. index.js:49  Query homepage results
4. upload.js:7  express deprecated req.param(name): Use req.params, req.body, or req.query instead
5. upload.js:31  express deprecated req.param(name): Use req.params, req.body, or req.query instead
6. upload.jade:19  Use Angular to make the form selection dynamic
...

Run Site:
sh debug.sh
http://localhost:3000/
(mongo db connection will need to be enabled and configured with a user)
