var assert = require('assert');

module.exports = function() {};

module.exports.prototype = {

    configure: function(operators) {
        assert(Array.isArray(operators), 'disallowLeftStickedOperators option requires array value');
        this._operatorIndex = {};
        for (var i = 0, l = operators.length; i < l; i++) {
            this._operatorIndex[operators[i]] = true;
        }
    },

    getOptionName: function () {
        return 'disallowLeftStickedOperators';
    },

    check: function(file, errors) {
        var operators = this._operatorIndex;
        var tokens = file.getTokens();
        for (var i = 0, l = tokens.length; i < l; i++) {
            var token = tokens[i];
            if (token.type === 'Punctuator' && operators[token.value]) {
                var prevToken = tokens[i - 1];
                if (prevToken && prevToken.range[1] === token.range[0]) {
                    errors.add(
                        'Operator ' + token.value + ' should not stick to preceding expression',
                        token.loc.start
                    );
                }
            }
        }
    }

};
