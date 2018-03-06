/**
 * Helper pause method
 * @param {Number} ms
 */
const pause = ms => new Promise(res => setTimeout(res, ms));

module.exports = pause;
