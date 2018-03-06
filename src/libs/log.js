/**
 * Helper method to provide a simple API for cli logging
 * @param {object} options
 */
function logger(options = {}) {
    const { verbose } = options;
    if (verbose) console.log('');
    return function log(msg) {
        if (verbose && msg === undefined) return console.log('');
        return verbose && console.log(msg);
    };
}

module.exports = logger;
