const express = require('express');
const app = express();

app.use('/v1/pacientes', require('./personas'));

module.exports = app;