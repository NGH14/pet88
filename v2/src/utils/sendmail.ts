import nodemailer from 'nodemailer';
import { EMAIL_HOSTING, SENDER } from '../constants/email.ts';

async function sendMail(
	dataSend: nodemailer.SendMailOptions,
	template: string,
) {
	let transport = nodemailer.createTransport(EMAIL_HOSTING);

	// send mail with defined transport object
	 const info = await transport.sendMail({
		from: `" ${SENDER.email} " <${SENDER.name}>`,
		to: dataSend.to, // list of receivers
		subject: dataSend.subject, // Subject line
		text: dataSend.text || '', // plain text body
		html: template, // html body
	});
	return info
}

export default sendMail;
