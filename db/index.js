const mongoose = require('mongoose');
const { dbURI } = require('../config');

const options = { 
  poolSize: 10,
  useNewUrlParser: true,
  useCreateIndex: true,
};

mongoose.connect(dbURI, options);

exports.close = (err) => {
  if (err) console.log(err.message);
  mongoose.connection.close();
  process.exit();
};