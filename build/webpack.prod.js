const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const path = require('path')
const fs = require('fs')

exports = require('./webpack.base')

exports.mode = 'production'
exports.output.filename = 'eruda.js'
exports.devtool = 'source-map'
exports.plugins = exports.plugins.concat([
  new webpack.DefinePlugin({
    ENV: '"production"',
  }),
  // Copy font files to dist directory
  {
    apply: (compiler) => {
      compiler.hooks.thisCompilation.tap('CopyFontPlugin', (compilation) => {
        compilation.hooks.processAssets.tap(
          {
            name: 'CopyFontPlugin',
            stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
          },
          () => {
            const fontSrc = path.resolve(__dirname, '../src/assets/eruda-icon.woff')
            const fontDest = 'eruda-icon.woff'
            
            try {
              const content = fs.readFileSync(fontSrc)
              compilation.emitAsset(fontDest, {
                source: () => content,
                size: () => content.length,
              })
            } catch (err) {
              const error = new Error(
                `Failed to copy font file from ${fontSrc} to ${fontDest}: ${err.message}`
              )
              compilation.errors.push(error)
            }
          }
        )
      })
    },
  },
])
exports.optimization = {
  minimize: true,
  minimizer: [
    new TerserPlugin({
      extractComments: false,
    }),
  ],
}

module.exports = exports
