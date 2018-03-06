const chalk = require('chalk');

const domain = require('./libs/domain');
const proxies = require('./libs/proxy');
const thesaurus = require('./libs/thesaurus');
const logger = require('./libs/log');
const pause = require('./libs/pause');

/**
 * Default settings
 * @type {object}
*/
const DEFAULTS = {
    wait: process.env.WAIT || 1300,
    proxy: process.env.PROXY_ACTIVE || true,
    proxycount: process.env.PROXY_ACTIVE || true,
    verbose: false,
    mock: false,
};

/**
 * Method to perform the proxy and domain whois checks
 * @param {array} words
 * @param {object} config
 */
async function lookup(words, config) {

    const log = logger(config);

    log();

    for (let p = 0; p < config.proxycount; p++) {
        await proxies.fetch();
    }

    if (!config.mock) {
        for (let i = 0; i < words.length; i++) {
            await domain.batch(words[i], config.proxy);
            await pause(config.wait);
        }

        log();
        log(`${chalk.yellow('Complete:')}  Found ${chalk.bold(domain.results.available.length)} domains.`);
        log();
    }
}

/**
 * Thesaurus Domain Search
 * @param {string} seed
 * @param {object} options
 */
async function synonyms(seed, options) {
    const config = Object.assign(DEFAULTS, options);

    const log = logger(config);

    log(`${chalk.yellow('Search Type:')} Thesaurus Lookup`);
    log(`${chalk.yellow('Proxies:')} ${config.proxycount}`);
    log(`${chalk.yellow('Word:')} ${seed}`);

    const words = thesaurus.list(seed);

    log(`${chalk.yellow('Synonyms Count:')} ${words.length}`);
    log(`${chalk.yellow('Synonyms :')} ${words.join(', ')}`);
    log();

    lookup(words, config);
}


/**
 * Thesaurus Domain Search
 * @param {string} seed
 * @param {object} options
 */
async function check(seed, options) {
    const config = Object.assign(DEFAULTS, options);

    const log = logger(config);

    log(`${chalk.yellow('Search Type:')} Single Word Lookup`);
    log(`${chalk.yellow('Proxies:')} ${config.proxycount}`);
    log(`${chalk.yellow('Word:')} ${seed}`);

    const words = [seed];

    lookup(words, config);
}

module.exports = {
    synonyms,
    check,
};
