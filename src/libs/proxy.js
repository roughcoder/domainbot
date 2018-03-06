const needle = require('needle');

/**
 * Endpoint for fresh proxy
 * @type {string}
 */
const PROXY_URL = process.env.PROXY_URL || 'https://gimmeproxy.com/api/getProxy';

/**
 * Proxies
 * @type {Array}
 */
const PROXY_LIST = [];

/**
 * Return a free proxy from proxy provider
 * @return {Promise}
 */
function fetch() {
    return new Promise(((resolve) => {
        needle.get(PROXY_URL, (error, response, body) => {
            PROXY_LIST.push(body);
            return resolve(body);
        });
    }));
}

/**
 * Returns a random proxy from the proxy list
 * @return {Object}
 */
function get() {
    return PROXY_LIST[Math.floor(Math.random() * PROXY_LIST.length)];
}

/**
 * Wipes all currently held proxies
 * @return {Null}
*/
function clear() {
    PROXY_LIST.length = 0;
}

module.exports = {
    fetch,
    get,
    clear,
};
