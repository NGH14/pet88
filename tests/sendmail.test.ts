import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app.ts';

const should = chai.should();
const expect = chai.expect;
import { randCity, randStreetAddress } from '@ngneat/falso';

chai.use(chaiHttp);


describe('Send Mail API', () => {
const baseUrl = '/api/v1/email';

  it('should POST to send mail', (done) => {
    const mail = {    
      "data": {
       "subject": "Pet88: Test Send Mail",
        "to": "vuhuunghia2001@gmail.com"
      },
      "template": "<p> test </p>"
  };
    chai
      .request(app)
      .post(baseUrl)
      .set('content-type', 'application/json')
      .send(JSON.stringify(mail))
      .end((_err, res) => {
        res.should.have.status(200);
        res.body.message.should.be.contain("sent");
      });
    done();
  });
  it('should not POST to send the missing data mail', (done) => {
    const mail = {    
      "data": {},
      "template": "<p> test </p>"
  };
    chai
      .request(app)
      .post(baseUrl)
      .set('content-type', 'application/json')
      .send(JSON.stringify(mail))
      .end((_err, res) => {
        res.should.have.status(500);
      });
    done();
  });
});