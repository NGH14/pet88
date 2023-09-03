import chai from 'chai';

import mongoose from 'mongoose';
import { Department } from '../src/models/department.ts';
import express from 'express';
import chaiHttp from 'chai-http';
import { app } from '../src/index.ts';
import { connectDB } from '../src/config/mongodb.js';

chai.should();

chai.use(chaiHttp);
describe('Department', () => {
	const endPoint = '/api/departments';

	// Needed to clean the database before each test
	beforeEach((done) => {
		connectDB();
		Department.deleteMany({}, (err) => {
			done();
		});
	});

	describe('/GET department', () => {
		it('should GET the empty array', () => {
			chai.request(app)
				.get(endPoint)
				.end((_err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('array');
					res.body.length.should.be.equal(0);
				});
		});
	});
	describe('/POST department', () => {
		const sample = {
			name: 'test new api',
			type: 'owner',
			city: 'Ha Noi',
			address: 'somewhere',
			title: 'Best Hotel in the City',
			desc: 'hotel description',
			services: ['grooming', 'hotel'],
		};
		it('should POST department ', () => {
			chai.request(app)
				.post(endPoint)
				.set('content-type', 'application/json')
				.send(JSON.stringify(sample))
				.end((_err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('_id');
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
