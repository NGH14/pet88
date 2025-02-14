import admin from 'firebase-admin';
const firebaseAccount = JSON.parse(process.env.FIREBASE_ACCOUNT_KEY);

admin.initializeApp({
	credential: admin.credential.cert(firebaseAccount),
});

export default admin;
