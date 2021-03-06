'use strict'

const path = require('path');
const { DefinePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  mode: 'production',

  target: 'web',

  entry: path.resolve(__dirname, 'src/index.js'),

  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'js/bundle.js',
  },

  devServer: {
    compress: true,
    contentBase: path.join(__dirname, 'public'),
  },

  performance: {
    hints: 'warning'
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/public/index.tpl.html',
      inject: 'body',
      filename: 'index.html',
    }),
    new CompressionPlugin({
      minRatio: 0.8,
      deleteOriginalAssets: true,
      algorithm: 'gzip',
      threshold: 8192,
      filename: '[path].gz[query]'
    }),
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true
    })
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              hmr: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]',
              camelCase: 'dashesOnly'
            }
          },
          {
            loader: "sass-loader"
          }]
      }
    ],
  },

  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false,
          },
        },
      })
    ],
  },
};