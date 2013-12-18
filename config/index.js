'use strict';

var _ = require('lodash');

var all = {
        port : 3000,
        forwarding : {
            event : {
                host : 'localhost',
                port : 3000
            }
        }
    },
    prod = {},
    dev = {};

function buildConfig(obj, config) {

    _.forEach(config, function(value, key) {

        if (_.isPlainObject(value)) {
            //allow recursive over riding
            obj[key] = {};
            buildConfig(obj[key], value);
        } else {

            obj[key] = value;
        }
    });
}

module.exports = function(app) {

    var config = {};
    var env;

    if ('production' == app.get('env')) {
        env = prod;
    } else {
        env = dev;
    }

    buildConfig(config, all);
    buildConfig(config, env);

    app.set('config', config);
};
