const nodewhois = require('node-whois');
const ora = require('ora');

const proxies = require('./proxy');

/**
 * Domain Extensions
 * @type {Array}
 */
const DOMAIN_EXTENSIONS = require('../config/extensions.json');

/**
 * Domains not found regexs
 * @type {Object}
 */
const DOMAIN_AVAILABLE_REGEX = require('../config/whois_regex.json');

/**
 * List of available domains
 * @type {Array}
 */
const DOMAINS_AVAILABLE = [];

/**
 * List of unavailable domains
 * @type {Array}
 */
const DOMAINS_UNAVAILABLE = [];

/**
 * List of errors
 * @type {Array}
 */
const LOOKUP_ERRORS = [];

/**
 * Returns an domain extension
 * @param {string} domain
 * @private
 */
function getExtension(domain) {
    const split = domain.toLowerCase().split('.');
    split.shift();
    return `.${split.join('.')}`;
}

/**
 * Returns a whois regex check for availability
 * @param {string} extension
 * @private
 */
function getAvailableRegex(extension) {
    const regex = DOMAIN_AVAILABLE_REGEX[extension];
    return regex && new RegExp(DOMAIN_AVAILABLE_REGEX[extension], 'i');
}

/**
 * Method to update search status and results within the cli
 * @param {string} domain
 * @private
 */
function cliStatus(domain) {
    const spinner = ora(`checking ${domain}`).start();

    function stop(response) {
        if (response === undefined) return spinner.fail(`${domain} failed`);
        if (response) return spinner.succeed(`${domain} available`);
        return spinner.stop();
    }
    return {
        stop,
    };
}

/**
 * Helper to log the serach responses (available, unavailable and error)
 * @param {bool} response
 * @param {string} domain
 * @param {object} error
 * @private
 */
function record(response, domain, error) {
    if (error) LOOKUP_ERRORS.push({ domain, error });
    if (response) return DOMAINS_AVAILABLE.push(domain);
    return DOMAINS_UNAVAILABLE.push(domain);
}

/**
 * Returns a boolean check against whois data regarding availability
 * @param {string} domain
 * @param {string} whoisResponse
 */
function isAvailablWhoIsCheck(domain, whoisResponse) {
    const extension = getExtension(domain);
    const regex = getAvailableRegex(extension);
    if (!regex) return false;
    return regex.test(whoisResponse);
}

/**
 * Simple wrapped around whois lib to update to native promise
 * @param {string} domain
 * @param {options} options
 */
function whois(domain, options) {
    return new Promise(((resolve) => {
        nodewhois.lookup(domain, options, (err, data) => {
            resolve({ err, data });
        });
    }));
}

/**
 * Method to check if a domain is available, return true/false
 * @param {string} domain
 * @param {boolean} useProxy
 */
async function check(domain, useProxy) {
    const extension = getExtension(domain);
    const status = cliStatus(domain);
    const options = {};

    if (useProxy) options.proxy = proxies.get();

    function complete(resp, err) {
        status.stop(resp);
        record(resp, domain, err);
        return resp;
    }

    if (!extension) return complete();

    const { err, data } = await whois(domain, options);

    if (err) return complete(undefined, err);
    return complete(isAvailablWhoIsCheck(domain, data));
}

/**
 * Method to add all available extensions to a word and check availability
 * @param {string} word
 * @param {boolean} useProxy
 */
async function batch(word, useProxy) {
    DOMAINS_AVAILABLE.length = 0;
    for (let i = 0; i < DOMAIN_EXTENSIONS.length; i++) {
        await check(`${word}.${DOMAIN_EXTENSIONS[i]}`, useProxy);
    }
    return DOMAINS_AVAILABLE;
}

module.exports = {
    check,
    batch,
    isAvailablWhoIsCheck,
    results: {
        available: DOMAINS_AVAILABLE,
        errors: LOOKUP_ERRORS,
        unavailable: DOMAINS_UNAVAILABLE,
    },
    helpers: {
        getExtension,
        getAvailableRegex,
        cliStatus,
        record,
    },
};
