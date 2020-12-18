const express = require('express');
const cors = require ('cors')
const { createApiRouter } = require('./api');
const dataStore = require('./store/dataStore');

const config = process.env.NODE_ENV === 'production'
  ? require('./config/production')
  : require('./config/development');

// Setting up the web server
const server = express();

// Set up for the API server
const dataStoreInstance = dataStore.initalizeDb(config.eventsFile, config.promotionsFile);

server.use('/data',cors(), createApiRouter(dataStoreInstance));
const options = {
  origin: "*",
  methods: ["GET,POST"],
  credentials: false,
  maxAge: 3600
};
server.options('*', cors(options));
// Allow client-side routing to manage everything else
server.get(
  '*',
  cors(options),
  (req, res, next) => {
    req.url = '/';
    next();
  }
);

server.listen(config.port, () => {
  console.log(`Server running on port: ${config.port}`);
});