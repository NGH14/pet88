import nodemailer from 'nodemailer';

async function sendNodeMail(dataSend, template) {
	let transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 587,
		secure: false,
		auth: JSON.parse(process.env.MAIL_ACCOUNT),
	});

	// send mail with defined transport object
	let info = await transporter.sendMail({
		from: '"Pet88 Service" <servicepet88@gmail.com>', // sender address
		to: dataSend.recipient, // list of receivers
		subject: dataSend.subject, // Subject line
		text: dataSend.text || '', // plain text body
		html: template, // html body
	});
}

export default sendNodeMail;
