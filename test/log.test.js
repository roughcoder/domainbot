const logger = require('../src/libs/log');

describe('logger', () => {

    it('shoudl export correct methods', () => {
        expect(typeof logger).toBe('function');
    });

    describe('on first call', () => {

        let spy;

        beforeEach(() => {
            spy = jest.spyOn(global.console, 'log');
        });

        afterEach(() => {
            spy.mockRestore();
        });

        it('creates an empty line when verbose is on', () => {
            logger({ verbose: true });
            expect(console.log).toHaveBeenCalledWith('');
        });

        it('does nothing is verbose is false', () => {
            logger();
            expect(console.log).not.toHaveBeenCalled();
        });

        it('should return a function', () => {
            const log = logger();
            expect(typeof log).toBe('function');
        });

    });

    describe('returned function', () => {
        let spy;

        beforeEach(() => {
            spy = jest.spyOn(global.console, 'log');
        });

        afterEach(() => {
            spy.mockRestore();
        });

        it('calls console.log with message is verbose is true', () => {
            const log = logger({ verbose: true });
            log('hello');
            expect(console.log).toHaveBeenCalledWith('hello');
        });

        it('it does not call console.log with message is verbose is false', () => {
            const log = logger({ verbose: false });
            log('hello');
            expect(console.log).not.toHaveBeenCalledWith('hello');
        });

        it('it calls console.log with an empty string if nothing is passed', () => {
            const log = logger({ verbose: true });
            log();
            expect(console.log).toHaveBeenCalledWith('');
        });


    });

});
