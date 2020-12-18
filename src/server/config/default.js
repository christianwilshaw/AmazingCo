module.exports = {
  // The port on which the web-server should be accessed
  port: 8080,
  // How to serve the assets,
  // - 'webpack' is for development and recompiles assets as they change
  // - 'static' is for production and requires the assets to be compiled into the _public folder
  assets: 'webpack',
  // Provide the Lexicon API key here...
  apiKey: '',
  // Specify how many times to retry the upstream movie apis before giving up
  upstreamRetryLimit: 1,
  eventsFile: 'src/server/store/events.json',
  promotionsFile: 'src/server/store/promotions.json'
};
