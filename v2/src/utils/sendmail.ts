import nodemailer from 'nodemailer';

async function sendMail(
	dataSend: nodemailer.SendMailOptions,
	template: string,
) {
	let transport = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 587,
		secure: false,
		auth: JSON.parse(process.env.MAIL_ACCOUNT),
	});

	// send mail with defined transport object
	 const info = await transport.sendMail({
		from: '"Pet88 Service" <servicepet88@gmail.com>', // sender address
		to: dataSend.to, // list of receivers
		subject: dataSend.subject, // Subject line
		text: dataSend.text || '', // plain text body
		html: template, // html body
	});
	return info
}

export default sendMail;
