# !/bin/bash

#
# EdPurp Install Script
#

#Functions
test_packages()
{
	if [ -f /usr/bin/npm ]
	then
		echo 'NPM ........... Pass'
	fi
}
test_folders()
{
	if [ -d ./public/uploads ]
	then
		echo 'public/uploads ........... Pass'
	else
		`mkdir public/uploads`
		echo 'public/uploads ........ Created'
	fi
}
npm_install()
{
	# Install EdPurp Packages
	npm install
	# Install mongodb packages needed by mongoose
	cd node_modules/mongoose/node_modules/mongodb/
	npm install
}
#Main
test_packages
test_folders
npm_install
