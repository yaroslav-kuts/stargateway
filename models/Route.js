const mongoose = require('mongoose');

const { Schema } = mongoose;

const routeSchema = new Schema({
  securityLevel: Number,
  gates: [Number],
  spaceship: {
    type: Schema.ObjectId,
    ref: 'Spaceship',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

routeSchema.index({ spaceship: 1, createdAt: -1 });

module.exports = mongoose.model('Route', routeSchema);
