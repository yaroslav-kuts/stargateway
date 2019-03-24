const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const spaceshipSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  sector: Number,
});

module.exports = mongoose.model('Spaceship', spaceshipSchema);