export const SENDER = {
	email: 'servicepet88@gmail.com',
	name: 'Pet88 Service',
};

export const EMAIL_GMAIL_HOSTING = {
	host: 'smtp.gmail.com',
	port: 587,
	secure: false,
	auth: JSON.parse(process.env.MAIL_ACCOUNT),
};

export const VERIFICATION_SUBJECT = 'Please verify your email for Pet88';
