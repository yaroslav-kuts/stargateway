const { expect } = require('chai')
const { getGates } = require('./../utils');

describe('Check gates searching', () => {
    describe('for sector 56', () => {
        const sector = 56;

        it('and gates: 1 7 13 17 22 34 56 78', () => {
            const gates = [1, 7, 13, 17, 22, 34, 56, 78];
            const expected = [22, 34];
            const actual = getGates(sector, gates);
            expect(actual).to.deep.equal(expected)
        });

        it('and gates: 2 5 9 12 13 15 16 25 33 47', () => {
            const gates = [2, 5, 9, 12, 13, 15, 16, 25, 33, 47];
            const expected = [2, 5, 9, 12, 13, 15];
            const actual = getGates(sector, gates);
            expect(actual).to.deep.equal(expected)
        });

        it('and gates: 1 7 16 19 21 34 56 78', () => {
            const gates = [1, 7, 16, 19, 21, 34, 56, 78];
            const expected = [16, 19, 21];
            const actual = getGates(sector, gates);
            expect(actual).to.deep.equal(expected)
        });

        it('and gates: 2 3 7 11 16 17 20 25 33 47', () => {
            const gates = [2, 3, 7, 11, 16, 17, 20, 25, 33, 47];
            const expected = [2, 3, 7, 11, 16, 17];
            const actual = getGates(sector, gates);
            expect(actual).to.deep.equal(expected)
        });

        it('and gates: 5 9 17 19 20 25 33 47', () => {
            const gates = [5, 9, 17, 19, 20, 25, 33, 47];
            const expected = [17, 19, 20];
            const actual = getGates(sector, gates);
            expect(actual).to.deep.equal(expected)
        });
    });
});
