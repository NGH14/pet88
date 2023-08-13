require('dotenv').config('');
const privateKey = process.env.FIREBASE_CREDENTIALS_PRIVATE_KEY.replace(
	/\\n/g,
	'\n',
);

const serviceAccount = {
	type: 'service_account',
	project_id: 'pet88-35fa9',
	private_key_id: '20da4d389863947aa37e4189a4408707af429e94',
	private_key: privateKey,
	client_email: 'firebase-adminsdk-6e7jp@pet88-35fa9.iam.gserviceaccount.com',
	client_id: '117828859049661936280',
	auth_uri: 'https://accounts.google.com/o/oauth2/auth',
	token_uri: 'https://oauth2.googleapis.com/token',
	auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
	client_x509_cert_url:
		'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-6e7jp%40pet88-35fa9.iam.gserviceaccount.com',
};

module.exports = serviceAccount;
