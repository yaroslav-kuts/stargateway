const request = require('supertest');
const chai = require('chai');
const mongoose = require('mongoose');
const factory = require('./../db/factory');
const Spaceship = require('./../models/Spaceship');
const Route = require('./../models/Route');

const { app } = require('./../index');

chai.should();

const agent = request(app);

describe('/spaceships', () => {
  beforeEach(async () => {
    if (!mongoose.connection.db) {
      await mongoose.connect('mongodb://localhost/stargateway');
    }
    await mongoose.connection.db.dropDatabase();
  });

  describe('GET /spaceships', () => {
    describe('should return status 200 OK', () => {
      it('for not empty spaceships list', async () => {
          await factory.createMany('spaceship', 5);
          const { status, body: { data } } = await agent.get('/spaceships');
          status.should.equal(200);
          data.length.should.equal(5);
      });
    });

    describe('should return status 200 OK', () => {
      it('for empty spaceships list', async () => {
          const { status, body: { data } } = await agent.get('/spaceships');
          status.should.equal(200);
          data.length.should.equal(0);
      });
    });
  });
});
