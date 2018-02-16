module.exports = {
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: [
          'es2015',
          'stage-2',
          'react'
        ],
        plugins: [
          'transform-decorators-legacy',
          'transform-async-to-generator'
        ]
      }
    }]
  }
};