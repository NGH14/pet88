import nodemailer from 'nodemailer';
import { EMAIL_GMAIL_HOSTING, SENDER } from '../constant/email.ts';

async function sendMail(
	dataSend: nodemailer.SendMailOptions,
	template: string,
) {
	let transport = nodemailer.createTransport(EMAIL_GMAIL_HOSTING);


	const info = await transport.sendMail({
		from: `"${SENDER.name}" <${SENDER.email}>`,
		to: dataSend.to,
		subject: dataSend.subject,
		text: dataSend.text || '',
		html: template, 
	});

	return info
}

export default sendMail;

