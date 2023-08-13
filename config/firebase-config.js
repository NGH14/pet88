const admin = require('firebase-admin');
const serviceAccount = require('./accountKey.js');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
