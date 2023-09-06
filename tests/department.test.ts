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
import { randCity, randStreetAddress } from '@ngneat/falso';

const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);
describe('Department API', () => {
	const sample = {
		name: 'test new api',
		type: 'owner',
		city: randCity(),
		address: randStreetAddress(),
		title: 'Best Hotel in the City',
		desc: 'hotel description',
		services: ['grooming', 'hotel'],
	};
	const endPoint = '/api/departments/';
	beforeEach((done) => {
		connectDB();
		Department.deleteMany({}, (err) => {});
		done();
	});

	describe('/GET departments', () => {
		it('should GET the empty array', (done) => {
			chai
				.request(app)
				.get(endPoint)
				.end((_err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('array');
					res.body.length.should.be.equal(0);
				});
			done();
		});
		it('should GET a department by the given id', (done) => {
			let newDepartment = new Department(sample);
			newDepartment.save((_, department) => {
				chai
					.request(app)
					.get(endPoint + department._id)
					.end((_err, res) => {
						res.should.have.status(200);
						res.body.should.be.a('object');
						res.body.should.have.property('_id');
						res.body.should.have.property('type');
						res.body.should.have.property('services');
						res.body.should.have.property('city');
						res.body.should.have.property('title');
						res.body.should.have.property('_id').eql(department.id);
					});
			});
			done();
		});
	});
	describe('/POST department', () => {
		it('should POST department ', (done) => {
			chai
				.request(app)
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
			done();
		});

		it('should not POST department city field', (done) => {
			const { city, ...sampleWithoutCityField } = sample;
			chai
				.request(app)
				.post(endPoint)
				.set('content-type', 'application/json')
				.send(JSON.stringify(sampleWithoutCityField))
				.end((_err, res) => {
					res.should.status(500);
					res.body.should.be.a('object');
					res.body.should.have.property('errors');
					res.body.errors.should.have.property('city');
				});
			done();
		});

		it('should POST departments', (done) => {
			chai
				.request(app)
				.post(endPoint + 'list')
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
			chai
				.request(app)
				.put(endPoint + newDepartment._id)
				.send({ city: 'Da Nang' })
				.end((_err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('city').eql('Da Nang');
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
					.del(endPoint + department._id)
					.end((_err, res) => {
						res.should.have.status(200);
					});
			});
		});
	});
	describe('/PATH department', () => {
		it('should DELETE a department given the id', (done) => {
			let newDepartment1 = new Department(sample);
			let newDepartment2 = new Department(sample);

			const listID = Array(newDepartment1, newDepartment2).map(
				(department) => department._id,
			);
			chai
				.request(app)
				.patch(endPoint + 'multiple-delete')
				.set('content-type', 'application/json')
				.send(JSON.stringify(listID))
				.end((_err, res) => {
					res.should.have.status(200);
					res.body.should.be.contain('deleted');
				});
			done();
		});
	});
});
