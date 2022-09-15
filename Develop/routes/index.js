const express = require('express');

// Import our modular routers for /tips and /feedback
const apiRoutes = require('./apiroutes');

const app = express();

app.use('/api', apiRoutes);

module.exports = app;