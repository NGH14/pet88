export const SENDER = {
	email: 'servicepet88@gmail.com',
	name: 'Pet88 Service',
};
export const EMAIL_HOSTING = {
	host: DEFAULT_HOST,
	port: 587,
	secure: true,
	auth: JSON.parse(process.env.MAIL_ACCOUNT),
};
