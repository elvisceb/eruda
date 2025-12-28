const webpack = require('webpack')

exports = require('./webpack.base')

exports.mode = 'development'
exports.output.filename = (chunkData) => {
  // Only output eruda.js, skip the styles chunk  
  return chunkData.chunk.name === 'eruda' ? 'eruda.js' : '[name].js'
}
exports.devtool = 'source-map'
exports.plugins = exports.plugins.concat([
  new webpack.DefinePlugin({
    ENV: '"development"',
  }),
])

module.exports = exports
