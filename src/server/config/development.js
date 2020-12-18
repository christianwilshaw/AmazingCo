module.exports = {
  // The port on which the web-server should be accessed
  port: 8080,
  // How to serve the assets,
  // - 'webpack' is for development and recompiles assets as they change
  // - 'static' is for production and requires the assets to be compiled into the _public folder
  assets: 'webpack',
  // Specify how many times to retry the upstream movie apis before giving up
  upstreamRetryLimit: 1,
  // locations where we get the events and the promotions from.
  eventsFile: '../../src/server/store/events.json',
  promotionsFile: '../../src/server/store/promotions.json'
};
