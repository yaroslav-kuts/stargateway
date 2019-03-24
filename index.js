const fs = require('fs');
const bodyParser = require('body-parser');
const app = require('express')();
const db = require('./db');
const Spaceship = require('./models/Spaceship');
// const seeds = require('./db/seeds');

let gatesMatrix = [];

fs.readFile('./gates.txt', 'utf8', (error, data) => {
    if (error) console.log(error);
    gatesMatrix = data.split('\n').map(line => line.split(' ').map(v => +v.match(/[0-9]+/)[0]));
});

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

const sum = arr => arr.reduce((s, v) => s + v, 0)

const getGates = (sector, gates) => {
    for (let i = 0; i < gates.length; i++) {
        for (let j = i + 1; j <= gates.length; j++) {
            let sub = gates.slice(i, j);
            if (sum(sub) === +sector) {
                return sub; 
            }
        }     
    }
    return [];
};

app.post('/spaceships/:id/to/:sector', async ({ params: { id, sector } }, res) => {
    const spaceship = await Spaceship.findById(id);
    if (!spaceship) {
        return res.status(404).json({ 
            message: 'There is no such spaceship',
            data: { id },
        });
    }
    const result = gatesMatrix.map((gates, i) => ({ securityLevel: i, gates: getGates(sector, gates)}));
    return res.json({ message: 'ok', data: result });   
});

const port = 3000;
app.listen(port, () => console.log('Server running...'));