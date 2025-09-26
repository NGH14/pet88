export const SENDER = {
	email: 'servicepet88@gmail.com',
	name: 'Pet88 Service',
};

export const EMAIL_HOSTING = {
	host: 'smtp.gmail.com',
	port: 587,
	secure: false,
	auth: JSON.parse(process.env.MAIL_ACCOUNT),
};
