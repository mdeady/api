'use strict';

module.exports = function(app) {

    console.log('routing');

    // Setup forwarding of requests to other servers
    // based on the path prefix.
    require('./forwarding')(app);

    app.get('/blah', function(req, res) {

        console.log('blah');
        res.send(201, 'hello from /blah');
    });

    app.get('/', function(req, res) {

        console.log('/');
        res.send('hello from /');
    });
};
