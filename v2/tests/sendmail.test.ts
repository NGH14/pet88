import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app.ts';
import sendMail from '../src/utils/sendmail.ts';
const should = chai.should();
const expect = chai.expect;
import { randCity, randStreetAddress } from '@ngneat/falso';
import { SENDER } from '../src/constants/email.ts';

chai.use(chaiHttp);

describe('Send Mail API', () => {
	const baseUrl = '/api/v2/' + 'email';

	it('should POST to send mail', async () => {
		const dataSend = {
			to: SENDER.email,
			subject: 'Test email',
			text: 'This is a test email.',
		};

		const template = `
		<html>
			<head>
				<title>Test email</title>
			</head>
			<body>
				<h1>This is a test email.</h1>
			</body>
		</html>`;

		const info = await sendMail(dataSend, template);

		info.response.should.contain(250);
	});
});
