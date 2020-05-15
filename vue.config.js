'use strict'
const path = require('path');

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/v2/'
    : '/',
  outputDir: 'client/dist',
  pages: {
    index: {
      entry: 'client/src/main.js',
      template: 'client/public/index.html'
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.join(__dirname, 'client/src')
      }
    }
  }
}