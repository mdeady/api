'use strict';

var http = require('http'),
    _ = require('lodash');

module.exports = function(app) {

    _.each(app.get('config').forwarding, function(defaults, name) {

        // For all requests that start with '/<name>',
        // Forward request to other server.

        var regex = new RegExp('^\\/' + name + '(\\/?.*)');
        app.get(regex, function(req, res) {

            // Start with the configured options
            var options = _.assign({}, defaults);

            // Add request-specific information.
            _.assign(options, {
                path    : req.path.match(regex)[1],
                method  : req.method,
                headers : req.headers
            });

            console.log(options);

            var creq = http.request(options);

            creq.on('response', function(cres) {

                // set encoding
                cres.setEncoding('utf8');

                // wait for data
                cres.on('data', function(chunk) {

                    if (!res.headerSent) {
                        res.writeHead(cres.statusCode);
                    }
                    console.log('chunk : ' + chunk);
                    res.write(chunk);
                });

                cres.on('end', function() {
                    res.end();
                });

                console.log(cres);

            });

            creq.on('error', function(e) {

                console.error(e.message);

                res.writeHead(500);
                res.end();
            });

            creq.end();

        });
    });
};
