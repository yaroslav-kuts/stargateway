require('./index');

const factory = require('./factory');

factory.createMany('spaceship', 5).then(process.exit);
