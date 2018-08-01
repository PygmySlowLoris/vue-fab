module.exports =
  configureWebpack: (config) ->
    config.entry =
      app: [
        './demo/main.js'
        './demo/assets/logo.png'
      ]
    if process.env.NODE_ENV == 'production'
      config.output.publicPath = ''
    config.module.rules
      .push
        test: /\.coffee$/
        use: [ 'babel-loader', 'coffee-loader' ]
    return
