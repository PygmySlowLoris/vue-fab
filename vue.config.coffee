webpack = require 'webpack'

module.exports =
  compiler: true
  configureWebpack: (config) ->
    config.entry =
      app: [
        './demo/main.js'
        './demo/assets/logo.png'
      ]
    if process.env.NODE_ENV == 'production'
      config.output.publicPath = './'
    return
