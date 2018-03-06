const domain = require('../src/libs/domain');

describe('domains', () => {

    describe('check', () => {

        it('returns a promise', () => {
            const { check } = domain;
            expect(typeof check('exmaple.com').then).toBe('function');
        });


        it('return true is available', async () => {

            const result = await domain.check('thisdomainisavailablebot.com');

            expect(result).toBeTruthy();

        });

        it('return false if unavailable', async () => {

            const result = await domain.check('google.com');

            expect(result).toBeFalsy();

        });

        it('return false if unregonised extension', async () => {

            const result = await domain.check('google.testets');

            expect(result).toBeFalsy();

        });

        it('return false if errors', async () => {

            const result = await domain.check('google');

            expect(result).toBeFalsy();

        });

    });

    describe('batch', () => {

        it('returns an array of available domains', async () => {

            const result = await domain.batch('thisdomainisavailablebot');

            expect(Array.isArray(result)).toBeTruthy();

        });

        it('returns an array of available domains', async () => {

            const result = await domain.batch('itshouldcontainthese');
            expect(result).toEqual([
                'itshouldcontainthese.io',
                'itshouldcontainthese.net',
                'itshouldcontainthese.com',
            ]);

        });


    });

});
