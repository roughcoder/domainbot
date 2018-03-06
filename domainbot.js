#!/usr/bin/env node

const program = require('commander');
const pck = require('./package.json');

const domainbot = require('./src');

function convertStringToBool(str) {
    return JSON.parse(str.toLowerCase());
}
program
    .version(pck.version)
    .option('-p, --proxy <boolean>', 'turn proxies on or off. defaults to true')
    .option('-P, --proxycount <number>', 'define the number of proxies to use')
    .option('-w, --wait <number>', 'define the time to wait between calls (ms)')
    .option('-m, --mock', 'mock run (dont call whois servers)');

program
    .command('search <word>')
    .description('Thesaurus synonyms domain search against all extensions')
    .option('-p, --proxy <boolean>', 'turn proxies on or off. defaults to true')
    .option('-P, --proxycount <number>', 'define the number of proxies to use')
    .option('-w, --wait <number>', 'define the time to wait between calls (ms)')
    .option('-m, --mock', 'mock run (dont call whois servers)')
    .action((word, config) => {
        const options = {
            verbose: true,
        };
        if (config.proxy !== undefined) options.proxy = convertStringToBool(config.proxy);
        if (config.proxycount) options.proxycount = config.proxycount;
        if (config.wait) options.wait = config.wait;
        if (config.mock) options.mock = config.mock;
        domainbot.synonyms(word, options);
    });

program
    .command('check <word>')
    .description('Single word domain search against all extensions')
    .option('-p, --proxy <boolean>', 'turn proxies on or off. defaults to true')
    .option('-P, --proxycount <number>', 'define the number of proxies to use')
    .option('-w, --wait <number>', 'define the time to wait between calls (ms)')
    .option('-m, --mock', 'mock run (dont call whois servers)')
    .action((word, config) => {
        const options = {
            verbose: true,
        };
        if (config.proxy !== undefined) options.proxy = convertStringToBool(config.proxy);
        if (config.proxycount) options.proxycount = config.proxycount;
        if (config.wait) options.wait = config.wait;
        if (config.mock) options.mock = config.mock;
        domainbot.check(word, options);
    });

program.parse(process.argv);
