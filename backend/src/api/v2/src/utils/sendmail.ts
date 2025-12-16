import nodemailer from 'nodemailer';
import { EMAIL_GMAIL_HOSTING, SENDER } from '../constant/email.ts';

async function sendMail(
	dataSend: nodemailer.SendMailOptions,
	template: string,
) {
	let transport = nodemailer.createTransport(EMAIL_GMAIL_HOSTING);

	// send mail with defined transport object
	const info = await transport.sendMail({
		from: `"${SENDER.name}" <${SENDER.email}>`,
		to: dataSend.to, // list of receivers
		subject: dataSend.subject, // Subject line
		text: dataSend.text || '', // plain text body
		html: template, // html body
	});

	return info
}

export default sendMail;


sendMail({
	to: 'vuhuunghia2001@gmail.com',
	subject: 'Test Send Mail from Pet88',
}, "test")