function Ora(message) {
    this.initialMsg = message;
}

Ora.prototype.start = function () {
    console.log(this.initialMsg);
    return this;
};

Ora.prototype.fail = function (msg) {
    console.log(msg);
    return this;
};

Ora.prototype.succeed = function (msg) {
    console.log(msg);
    return this;
};

Ora.prototype.stop = function (msg) {
    console.log('');
    return this;
};

module.exports = function (msg) {
    return new Ora(msg);
};
