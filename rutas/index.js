const express = require('express');
const app = express();

app.use('/v1/content', require('./content'));

module.exports = app;