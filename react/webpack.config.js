var config = {
  entry: {
        path: __dirname + '/src/main.js',
  },
  output: {
        path: __dirname + '/../app/assets/javascripts',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  devtool: 'eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  delete config.devtool;
  var webpack = require('webpack');
  const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
  config.plugins = [
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"production"' }),
    new UglifyJSPlugin()
  ];
}

module.exports = config;
