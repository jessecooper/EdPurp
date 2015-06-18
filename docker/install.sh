# !/bin/bash

#
# EdPurp Install Script to be used with a Docker image
#

# Vars:
src_location=/usr/src/edpurp

#Functions
test_packages()
{
	if [ -f /usr/bin/npm -o -f /usr/local/bin/npm ]
	then
		echo 'NPM ........... Pass'
	else	
		echo 'NPM ........... Not Found'
		exit 1
	fi
}
test_folders()
{
	if [ -d $src_location/public/uploads ]
	then
		echo 'public/uploads ........... Pass'
	else
		`mkdir $src_location/public/uploads`
		echo 'public/uploads ........ Created'
	fi
}
npm_install()
{
	cd $src_location
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
