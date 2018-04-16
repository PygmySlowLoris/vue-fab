webpack = require 'webpack'

module.exports =
  compiler: true
  configureWebpack: (config) ->
    config.entry =
      app: [
        './demo/main.js'
      ]
    if process.env.NODE_ENV == 'production'
      config.output.publicPath = './'
    config.plugins.push new webpack.EnvironmentPlugin [
      'CLIENT_ID'
      'AUTH_URL'
    ]
    return
