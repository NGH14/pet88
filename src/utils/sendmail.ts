import nodemailer from 'nodemailer';
import SendmailTransport from 'nodemailer/lib/sendmail-transport';

async function sendMail(dataSend: nodemailer.SendMailOptions, template: SendmailTransport) {
	let transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 587,
		secure: false,
		auth: JSON.parse(process.env.MAIL_ACCOUNT),
	});

	// send mail with defined transport object
		transporter.sendMail({
		from: '"Pet88 Service" <servicepet88@gmail.com>', // sender address
		to: dataSend.to, // list of receivers
		subject: dataSend.subject, // Subject line
		text: dataSend.text || '', // plain text body
		html: template, // html body
	});
}

export default sendMail;
	