const thesaurusExpectation = require('./resources/thesaurus_expection.json');

describe('thesaurus', () => {
    it('shoudl export correct methods', () => {
        const thesaurus = require('../src/libs/thesaurus');

        expect(typeof thesaurus).toBe('object');
        expect(typeof thesaurus.list).toBe('function');
    });

    describe('list', () => {
        let thesaurus;

        beforeEach(() => {
            thesaurus = require('../src/libs/thesaurus');
        });

        afterEach(() => {
            thesaurus = undefined;
        });

        it('should return an array of words', () => {
            const words = thesaurus.list('fish');
            expect(words).toEqual(thesaurusExpectation);
        });

    });
});
