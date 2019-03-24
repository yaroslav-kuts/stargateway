const { factory } = require('factory-girl');
const Spaceship = require('../models/Spaceship');

factory.define('spaceship', Spaceship, {
  name: factory.chance('word'),
  sector: factory.chance('prime'),
});

module.exports = factory;
