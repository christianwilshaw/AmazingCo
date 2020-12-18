const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  // Would be a good idea to minify etc. in production...
  mode: 'development',
  entry: '../../src/server/main.js',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: '> 0.25%, not dead',
                  useBuiltIns: 'entry',
                  corejs: '2',
                  modules: 'cjs'
                }
              ],
              '@babel/preset-react'
            ]
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css']
  },
  output: {
    filename: 'index_bundle.js',
    path: path.resolve(__dirname, '_public'),
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Amazing Co Promotions System'
    })
  ]
};
