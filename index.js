const db = require('./db');
const fs = require('fs');
const util = require('util');
const bodyParser = require('body-parser');
const app = require('express')();
const Spaceship = require('./models/Spaceship');
const Route = require('./models/Route');
const { getGates, parseMatrix } = require('./utils');

const readFile = util.promisify(fs.readFile);

let gatesMatrix = [];

readFile('./gates.txt', 'utf8')
    .then((data) => {
        gatesMatrix = parseMatrix(data);
    })
    .catch(console.log)

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    return res.json({ message: 'ok' });   
});

app.get('/spaceships', async (req, res) => {
    const spaceships = await Spaceship.find({});
    return res.json({ message: 'ok', data: spaceships });   
});

app.get('/spaceships/:id', async ({ params: { id } }, res) => {
    const spaceship = await Spaceship.findById(id);
    if (!spaceship) {
        return res.status(404).json({ 
            message: 'There is no such spaceship',
            data: { id },
        });
    }
    return res.json({ message: 'ok', data: spaceship });   
});

app.post('/spaceships/:id/routes/:sector', async ({ params: { id, sector } }, res) => {
    const spaceship = await Spaceship.findById(id);
    if (!spaceship) {
        return res.status(404).json({ 
            message: 'There is no such spaceship',
            data: { id },
        });
    }  
    const routes = gatesMatrix.map((gates, i) => ({
        securityLevel: i,
        gates: getGates(sector, gates)
    }));
    await Promise.all(routes.map(route => Route.create(route)));
    return res.json({ message: 'ok', data: routes });
});

const port = 3000;
app.listen(port, () => console.log('Server running...'));


module.exports = { app };