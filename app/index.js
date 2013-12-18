'use strict';

module.exports = function(app) {

    // Define middleware
    require('./middleware')(app);

    // Define routing
    require('./routing')(app);
};
