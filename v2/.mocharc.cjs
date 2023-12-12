module.exports = {
	reporter: 'node_modules/mochawesome',
	'reporter-option': [
		'reportDir=tests/.reports',
		'overwrite=true',
		'reportFilename=index',
		'showPassed=true',
	],
};
