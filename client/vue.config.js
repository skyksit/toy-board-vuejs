'use strict'
const path = require('path');

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/v2/'
    : '/',
  outputDir: 'dist',
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html'
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src')
      }
    }
  }
}