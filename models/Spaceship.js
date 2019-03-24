const mongoose = require('mongoose');

const { Schema } = mongoose;

const spaceshipSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  sector: Number,
});

module.exports = mongoose.model('Spaceship', spaceshipSchema);
