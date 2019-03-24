const parseMatrix = (data) => data
    .split('\n')
    .map(line => line.split(' ').map(v => +v.match(/[0-9]+/)[0]));

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

module.exports = { getGates, parseMatrix };
