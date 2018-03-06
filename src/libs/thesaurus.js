const thesaurus = require('thesaurus-com');

/**
 * Helper to return a list of words to search against
 * @param {string} search
 */
function list(search) {
    const words = thesaurus.search(search).synonyms;
    return words.map(word => word.split(' ').join('').toLowerCase());
}

module.exports = {
    list,
};
