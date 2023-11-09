import chai from 'chai';
import mongoose from "mongoose";
import Department from '../src/models/department.ts';
import chaiHttp from 'chai-http';
import app from '../src/app.ts';
import { connectDB } from '../src/db/mongo.ts';

import { randCity, randStreetAddress } from '@ngneat/falso';

const should = chai.should();
chai.use(chaiHttp);
describe('Department API', () => {
	const baseUrl = '/api/v2/departments/';

	const sample = {
		name: 'test new api',
		type: 'owner',
		city: randCity(),
		address: randStreetAddress(),
		title: 'Best Hotel in the City',
		desc: 'hotel description',
		services: ['grooming', 'hotel'],
	};
	before((done) => {
		connectDB();
		done();
	});

	beforeEach((done) => {
		Department.deleteMany({}, (error) => {});
		done();
	});
	
	describe('/GET departments', () => {
		it('should GET the empty array', (done) => {
			chai
				.request(app)
				.get(baseUrl)
				.end((_err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.data.length.should.be.equal(0);
				});
			done();
		});
		it('should GET a department by the given id', (done) => {
			let newDepartment = new Department(sample);
			newDepartment.save((_, department) => {
				chai
					.request(app)
					.get(baseUrl + department._id)
					.end((_err, res) => {
						res.should.have.status(200);
						res.body.data.should.be.a('object');
						res.body.data.should.have.property('_id');
						res.body.data.should.have.property('type');
						res.body.data.should.have.property('services');
						res.body.data.should.have.property('city');
						res.body.data.should.have.property('title');
						res.body.data.should.have.property('_id').eql(department.id);
					});
			});
			done()
		});
	});
	describe('/POST department', () => {
		it('should POST department ', (done) => {
			chai
				.request(app)
				.post(baseUrl)
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
			done();
		});

		it('should not POST department city field', (done) => {
			const { city, ...sampleWithoutCityField } = sample;
			chai
				.request(app)
				.post(baseUrl)
				.set('content-type', 'application/json')
				.send(JSON.stringify(sampleWithoutCityField))
				.end((_err, res) => {
					res.should.status(500);
					res.body.should.be.a('object');
					res.body.should.have.any.key('success');
				});
			done();
		});

		it('should POST departments', (done) => {
			chai
				.request(app)
				.post(baseUrl + 'list')
				.set('content-type', 'application/json')
				.send(JSON.stringify([sample, sample]))
				.end((_err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('array');
					res.body.length.should.be.eql(2);
				});
			done();
		});
	});

	describe('/PUT/:id department', () => {
		it('should UPDATE a department given the id', (done) => {
			let newDepartment = new Department(sample);
			newDepartment.save((error) => {
				if (error) done(error);
				chai
					.request(app)
					.put(baseUrl + newDepartment._id)
					.send({ city: 'Da Nang' })
					.end((_err, res) => {
						res.should.have.status(200);
						res.body.data.should.be.a('object');
						res.body.data.should.have.property('city').eql('Da Nang');
					});
				});
				done();
			});
	});

	describe('/DELETE/:id department', () => {
		it('should DELETE a department given the id', () => {
			let newDepartment = new Department(sample);
			newDepartment.save((_, department) => {
				chai
					.request(app)
					.del(baseUrl + department._id)
					.end((_err, res) => {
						res.should.have.status(200);
					});
			});
		});
	});
});
