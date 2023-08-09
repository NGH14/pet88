const nodemailer = require('nodemailer');
const username = process.env.USERNAME;
const password = process.env.PASSWORD;

async function sendNodeMail(dataSend, template) {
	// create reusable transporter object using the default SMTP transport

	let transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 587,
		secure: false,
		auth: {
			user: username, // generated ethereal user
			pass: password, // generated ethereal password
		},
	});

	// send mail with defined transport object
	let info = await transporter.sendMail({
		from: '"Pet88 Service" <servicepet88@gmail.com>', // sender address
		to: dataSend.recipient, // list of receivers
		subject: dataSend.subject, // Subject line
		text: dataSend.text || '', // plain text body
		html: template, // html body
	});

	console.log('Message sent: %s', info.messageId);
	// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

	// Preview only available when sending through an Ethereal account
	console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
	// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

module.exports = { sendNodeMail: sendNodeMail };
