const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
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
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/plugin-transform-runtime',
              'transform-class-properties',
              // '@babel/plugin-proposal-private-property-in-object',
              // '@babel/plugin-proposal-class-properties',
            ], //javascript modern didown grade ke  presets lama
            exclude: /node_modules/,
          },
        },
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        type: 'asset/resource',
      },
      { test: /\.hbs$/, use: ['handlebars-loader'] },
    ],
  },

  optimization: {
    splitChunks: {
      // include all types of chunks. split / extract to separate file commonmodule like loadash, dll
      chunks: 'all',
      minSize: 10000,
      name: 'vendor',
      automaticNameDelimiter: '_',
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.hbs',
    }),
  ],
};
