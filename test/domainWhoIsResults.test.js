const domain = require('../src/libs/domain');

describe('domain', () => {

    describe('Whois Availability', () => {

        describe('unknown domain', () => {

            it('returns false for unavailable domain names', () => {
                const { isAvailablWhoIsCheck } = domain;
                const response = 'anything';
                expect(isAvailablWhoIsCheck('google.tester', response)).toBeFalsy();
            });

        });

        describe('.com domain', () => {

            it('returns true for available domain names', () => {
                const { isAvailablWhoIsCheck } = domain;
                const response = require('./resources/domains/com_available');
                expect(isAvailablWhoIsCheck('notregistereddomainbot.com', response)).toBeTruthy();
            });

            it('returns false for unavailable domain names', () => {
                const { isAvailablWhoIsCheck } = domain;
                const response = require('./resources/domains/com_unavailable');
                expect(isAvailablWhoIsCheck('google.com', response)).toBeFalsy();
            });

        });

        describe('.net domain', () => {

            it('returns true for available domain names', () => {
                const { isAvailablWhoIsCheck } = domain;
                const response = require('./resources/domains/net_available');
                expect(isAvailablWhoIsCheck('notregistereddomainbot.net', response)).toBeTruthy();
            });

            it('returns false for unavailable domain names', () => {
                const { isAvailablWhoIsCheck } = domain;
                const response = require('./resources/domains/net_unavailable');
                expect(isAvailablWhoIsCheck('google.net', response)).toBeFalsy();
            });

        });

        describe('.io domain', () => {

            it('returns true for available domain names', () => {
                const { isAvailablWhoIsCheck } = domain;
                const response = require('./resources/domains/io_available');
                expect(isAvailablWhoIsCheck('notregistereddomainbot.io', response)).toBeTruthy();
            });

            it('returns false for unavailable domain names', () => {
                const { isAvailablWhoIsCheck } = domain;
                const response = require('./resources/domains/io_unavailable');
                expect(isAvailablWhoIsCheck('google.io', response)).toBeFalsy();
            });

        });

    });
});
