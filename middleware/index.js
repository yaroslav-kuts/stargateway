const Spaceship = require('./../models/Spaceship');

const findSpaceship = async (req, res, next) => {
  const spaceship = await Spaceship.findById(req.params.id);
  if (!spaceship) {
    return res.status(404).json({
      message: 'There is no such spaceship',
    });
  }
  req.spaceship = spaceship;
  return next();
};

module.exports = { findSpaceship };
