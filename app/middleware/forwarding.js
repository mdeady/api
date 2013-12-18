'use strict';

var http = require('http'),
    _ = require('lodash');

module.exports = function(app) {

    _.each(app.get('config').forwarding, function(defaults, name) {

        // For all requests that start with '/<name>',
        // Forward request to other server.
        app.use('/' + name, function(req, res) {

            // Start with the configured options
            var options = _.assign({}, defaults);

            // Add request-specific information.
            _.assign(options, {
                path    : req.path,
                method  : req.method,
                headers : req.headers
            });

            http.request(options,
                function(fwdRes) {

                    res.setEncoding('utf8');

                    // Immediately write every chunk of data
                    // we get from the remote server
                    fwdRes.on('data', function(chunk) {

                        res.write(chunk);
                    });

                    // Close our initial response when the
                    // forwarded response is closed.
                    fwdRes.on('close', function() {

                        res.writeHead(fwdRes.statusCode);
                        res.end();
                    });
                })
                .on('error', function(e) {

                    console.error(e.message);
                    res.writeHead(500);
                    res.end();
                })
                .end();
        });
    });
};
