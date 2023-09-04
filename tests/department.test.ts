import chai from 'chai';

import mongoose from 'mongoose';
import { Department, createNewDepartment } from '../src/models/department.ts';
import chaiHttp from 'chai-http';
import { app } from '../src/index.ts';
import { connectDB } from '../src/config/mongodb.js';

const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);
describe('Department', () => {
	const sample = {
		name: 'test new api',
		type: 'owner',
		city: 'Ha Noi',
		address: 'somewhere',
		title: 'Best Hotel in the City',
		desc: 'hotel description',
		services: ['grooming', 'hotel'],
	};
	const endPoint = '/api/departments/';

	// Needed to clean the database before each test
	beforeEach((done) => {
		connectDB();
		Department.deleteMany({}, (err) => {
			done();
		});
	});

	describe('/GET departments', () => {
		it('should GET the empty array', () => {
			chai.request(app)
				.get(endPoint)
				.end((_err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('array');
					res.body.length.should.be.equal(0);
				});
		});
		it('should GET a department by the given id', async () => {
			const newDepartment = await createNewDepartment(sample)
			chai.request(app)
				.get(endPoint + newDepartment._id)
				.end((err, res) => {
							res.should.have.status(200);
							res.body.should.be.a('object');
							res.body.should.have.property('_id');
							res.body.should.have.property('type');
							res.body.should.have.property('services');
							res.body.should.have.property('city');
							res.body.should.have.property('title');
							res.body.should.have.property('_id').eql(newDepartment.id);
				});
			});

	});
	describe('/POST department', () => {

		it('should POST department ', () => {
			chai.request(app)
				.post(endPoint)
				.set('content-type', 'application/json')
				.send(JSON.stringify(sample))
				.end((_err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('_id');
					res.body.should.have.property('type');
					res.body.should.have.property('services');
					res.body.should.have.property('city');
					res.body.should.have.property('title');
				});
		});

		it('should not POST department city field', () => {
			const { city, ...sampleWithoutCityField } = sample;
			chai.request(app).post(endPoint).set('content-type', 'application/json').send(JSON.stringify(sampleWithoutCityField)).end((_err, res) => {
					res.should.status(500)
					res.body.should.be.a('object');
					res.body.should.have.property('errors');
					res.body.errors.should.have.property('city')
				});
		});
		
	});
});
