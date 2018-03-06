const nock = require('nock');

const proxies = require('../src/libs/proxy');

const proxyResponse1 = require('./resources/proxy_response_1.json');
const proxyResponse2 = require('./resources/proxy_response_2.json');

describe('proxies', () => {
    it('shoudl export correct methods', () => {

        expect(typeof proxies).toBe('object');
        expect(typeof proxies.fetch).toBe('function');
        expect(typeof proxies.get).toBe('function');
    });

    describe('fetch', () => {

        it('should call proxy endpoint', () => {
            nock('https://gimmeproxy.com')
                .get('/api/getProxy')
                .reply(200, proxyResponse1);

            expect.assertions(1);
            proxies.clear();
            return proxies.fetch().then(data => expect(data).toEqual(proxyResponse1));
        });

    });

    describe('get', () => {

        it('should return a single proxy', () => {
            nock('https://gimmeproxy.com')
                .get('/api/getProxy')
                .reply(200, proxyResponse2);

            expect.assertions(1);
            proxies.clear();
            return proxies.fetch().then(() => {
                expect(proxies.get()).toEqual(proxyResponse2);
            });
        });
    });

});
