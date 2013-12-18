'use strict';

module.exports = function(app) {

    // Setup forwarding of requests to other servers
    // based on the path prefix.
    require('./forwarding')(app);

    app.use(app.router);
};
