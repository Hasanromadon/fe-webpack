const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const prodConfig = {
  mode: 'production',
  entry: {
    index: './src/js/index.js',
  },
  output: {
    filename: 'js/[name].bundle.js',
    path: path.resolve(__dirname, './dist'),
    assetModuleFilename: 'img/[hash][ext][query]',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },

  plugins: [new MiniCssExtractPlugin({ filename: './css/styles.css' })],
};

module.exports = merge(commonConfig, prodConfig);
