import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/app.ts';
import sendMail from '../../src/utils/sendmail.ts';
import { randCity, randStreetAddress } from '@ngneat/falso';
import { SENDER } from '../../src/constant/email.ts';

const should = chai.should();
chai.use(chaiHttp);

describe('Send Mail API', () => {
	const baseUrl = '/api/v2/email';

	it('should POST to send mail', (done) => {
		const dataSend = {
			to: SENDER.email,
			subject: 'Test email',
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

		chai
			.request(app)
			.post(baseUrl)
			.set('content-type', 'application/json')
			.send(JSON.stringify({
				"data": {
					"subject": "Pet88: Test Send Mail",
					"to": "servicepet88@gmail.com"
				},
				"template": "<p> test </p>"
			}))
			.end((_err, res) => {
				res.should.have.status(200);
			});
		done();
	});
});
