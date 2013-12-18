'use strict';

var express = require('express'),
    app = express();

// Bootstrap configuration.
require('./config')(app);

// Bootstrap application.
require('./app')(app);

app.listen(app.get('config').port);
