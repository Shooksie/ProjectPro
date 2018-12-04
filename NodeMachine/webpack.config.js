const path = require('path');
const {resolvePath} = require('./utils');
const BundleTracker = require('webpack-bundle-tracker');

console.log('pathis:', path.resolve(__dirname, 'node_modules'));

module.exports = {
  mode: 'development',
  context: path.resolve(__dirname),
  entry: {
    main: './src/index.js',
    app: './src/app.js',
    ticketApp: '../projects/js/ticketApp.js',
    dragAndDrop: '../projects/js/dnd.js',
    markDownTest: path.resolve(__dirname, 'libs/markdown/src/testMarkdown.js')
  },
  devtool: 'inline-source-map',
  output: {
    filename: '[name]/[name].js',
    path: resolvePath('dist')
  },

  plugins: [
    new BundleTracker({filename: '../webpack-stats.json'}),
  ],

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react"
            ],
            plugins: [
              "@babel/plugin-proposal-class-properties"
            ]
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    modules: [path.resolve(__dirname, 'libs'), path.resolve(__dirname, 'node_modules')]
  },
};
