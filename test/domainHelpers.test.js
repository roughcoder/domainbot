const domain = require('../src/libs/domain');

const TEST_DOMAINS = {
    'google.com': '.com',
    'google.io': '.io',
    'google.net': '.net',
};

const DOMAIN_AVAILABLE_REGEX = require('../src/config/whois_regex.json');

describe('domain', () => {

    describe('Helpers', () => {

        describe('getExtension', () => {
            const { helpers: { getExtension } } = domain;
            Object.keys(TEST_DOMAINS).forEach((dom) => {
                it(`should returns the correct extension for ${dom}`, () => {
                    expect(getExtension(dom)).toBe(TEST_DOMAINS[dom]);
                });
            });
        });

        describe('getAvailableRegex', () => {
            const { helpers: { getAvailableRegex } } = domain;
            Object.keys(TEST_DOMAINS).forEach((dom) => {
                it(`should returns the correct extension for ${dom}`, () => {
                    const ext = TEST_DOMAINS[dom];
                    const actual = getAvailableRegex(ext);
                    const results = new RegExp(DOMAIN_AVAILABLE_REGEX[ext], 'i');
                    expect(actual).toEqual(results);
                });
            });
        });

        describe('cliStatus', () => {
            let spy;

            beforeEach(() => {
                spy = jest.spyOn(global.console, 'log');
            });

            afterEach(() => {
                spy.mockRestore();
            });

            it('displays the correct message when first called', () => {
                const { helpers: { cliStatus } } = domain;
                cliStatus('example.com');
                expect(console.log).toHaveBeenCalledWith('checking example.com');
            });

            it('displays an error when no params are passed', () => {
                const { helpers: { cliStatus } } = domain;
                const cli = cliStatus('example.com');
                cli.stop();
                expect(console.log).toHaveBeenCalledWith('example.com failed');
            });

            it('displays a success when a true is passed', () => {
                const { helpers: { cliStatus } } = domain;
                const cli = cliStatus('example.com');
                cli.stop(true);
                expect(console.log).toHaveBeenCalledWith('example.com available');
            });

            it('displays nothing when a false is passed', () => {
                const { helpers: { cliStatus } } = domain;
                const cli = cliStatus('example.com');
                cli.stop(false);
                expect(console.log).toHaveBeenCalledWith('');
            });
        });

        describe('record', () => {

            it('adds a domain when available', () => {
                const { helpers: { record }, results: { available } } = domain;
                record(true, 'example.com');
                expect(available.length).toBe(1);
            });

            it('adds a domain when unavailable', () => {
                const { helpers: { record }, results: { unavailable } } = domain;
                record(false, 'example.com');
                expect(unavailable.length).toBe(1);
            });

            it('adds a domain when errors (inc error blob)', () => {
                const { helpers: { record }, results: { errors } } = domain;
                record(true, 'example.com', {});
                expect(errors.length).toBe(1);
            });

        });
    });
});
