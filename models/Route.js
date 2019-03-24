const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const routeSchema = new Schema({
  securityLevel: Number,
  gates: [Number],
  spaceship: {
    type: Schema.ObjectId,
    ref: 'Spaceship'
  },
});

module.exports = mongoose.model('Route', routeSchema);