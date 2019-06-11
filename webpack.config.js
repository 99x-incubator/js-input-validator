var path = require('path');
var libraryName = 'js-input-validator';
var outputFile = libraryName + '.js';

var config = {
  mode: 'development',
  entry: './src/index.js',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: 'this'
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/
      }
    ]
  }
};

module.exports = config;