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

  describe('GET /spaceships/:id', () => {
    describe('should return status 200 OK', () => {
      it('for existing spaceship', async () => {
          const spaceship = await factory.create('spaceship');
          const { 
            status, body: { data: { name, sector } }
          } = await agent.get(`/spaceships/${spaceship._id}`);
          status.should.equal(200);
          name.should.equal(spaceship.name);
          sector.should.equal(spaceship.sector);
      });
    });

    describe('should return status 404 Not Found', () => {
      it('for not existing spaceship', async () => {
          const spaceship = await factory.build('spaceship');
          const { status, body: { message } } = await agent.get(`/spaceships/${spaceship._id}`);
          status.should.equal(404);
          message.should.equal('There is no such spaceship');
      });
    });
  });
});
