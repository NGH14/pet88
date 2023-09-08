import chai from 'chai';

import mongoose from 'mongoose';
import {
	Department,
	createListDepartments,
	createNewDepartment,
} from '../src/models/department.ts';
import chaiHttp from 'chai-http';
import { app } from '../src/index.ts';
import { connectDB } from '../src/config/mongodb.js';

const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

const baseUrl = '/api/email';

describe('Test Send Mail', () => {
  it('should POST to send mail', (done) => {
    const mail = {    
      "data": {
       "subject": "Pet88: Booking Confirmation",
        "to": "vuhuunghia2001@gmail.com"
      },
      "template": "<p> test </p>"
  };
    chai
      .request(app)
      .post(baseUrl)
      .set('content-type', 'application/json')
      .send(JSON.stringify(mail))
      .end((err, res) => {
        res.should.have.status(200);
        res.body.message.should.be.contain("sent");
        err.should.not.exit();
      });
    done();
  });
});