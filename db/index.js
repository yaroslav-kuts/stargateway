const mongoose = require('mongoose');

// const options = { poolSize: config.poolSize, useNewUrlParser: true };

const options = { poolSize: 10, useNewUrlParser: true };

// mongoose.connect(process.env.DB_URI, options);

mongoose.connect('mongodb://localhost/stargateway', options);

exports.close = (err) => {
  if (err) console.log(err.message);
  mongoose.connection.close();
  process.exit();
};