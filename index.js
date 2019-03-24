require('./db');
const fs = require('fs');
const util = require('util');
const express = require('express');
const Spaceship = require('./models/Spaceship');
const Route = require('./models/Route');
const { findSpaceship } = require('./middleware');
const { getGates, parseMatrix } = require('./utils');
const { port, pathToGatesFile } = require('./config');

const readFile = util.promisify(fs.readFile);

let gatesMatrix = [];

readFile(pathToGatesFile, 'utf8')
  .then((data) => {
    gatesMatrix = parseMatrix(data);
  })
  .catch(console.log);

const app = express();

app.get('/', (req, res) => res.json({ message: 'ok' }));

app.get('/spaceships', async (req, res) => res.json({ spaceships: await Spaceship.find({}) }));

app.get('/spaceships/:id', findSpaceship, async ({ spaceship }, res) => {
  const routes = await Route.find({ spaceship: spaceship._id }).sort({ createdAt: -1 });
  res.json({ ...spaceship.toObject(), routes });
});

app.post('/spaceships/:id/routes/:sector', findSpaceship, async ({ spaceship, params: { sector } }, res) => {
  spaceship.sector = sector;
  await spaceship.save();
  const routes = gatesMatrix.map((gates, i) => ({
    securityLevel: i + 1,
    gates: getGates(sector, gates),
  }));
  await Promise.all(routes.map(route => Route.create({ ...route, spaceship: spaceship._id })));
  return res.json({ routes });
});

app.listen(port, () => console.log(`Server running on ${port}`));

module.exports = { app };
