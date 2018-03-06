const pause = require('../src/libs/pause');

describe('pause', () => {

    it('should export correct methods', () => {

        expect(typeof pause).toBe('function');
    });

    it('should return a promise', () => {
        expect(typeof pause(5000).then).toBe('function');
    });

    it('should call then when timer complete', async () => {

        await pause(500);
        expect(true).toBeTruthy();
    });

});
