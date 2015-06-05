# !/bin/bash

#Functions
test_packages()
{
	if [ -f /usr/bin/npm ]
	then
		echo 'NPM ........... Pass'
	fi
}
npm_install()
{
	npm install
	cd node_modules/mongoose/node_modules/mongodb/
	npm install
}
#Main
test_packages
npm_install
