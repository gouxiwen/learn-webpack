const path = require('path');
const copyrightWebpackPlugin = require('./myPlugins/copyrightWebpackPlugin');
module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.js'
  },
  // 使用resolveLoader处理查找loader路径
  resolveLoader: {
    modules: ['node_modules', './myLoaders']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          // {
          //   loader: path.resolve(__dirname, './myLoader2')
          // },
          // path.resolve(__dirname, './myLoader2'),
          'loader2',
          {
          // loader: path.resolve(__dirname, './myLoader1'),
          loader: 'loader1',
          options: {
            name: 'kkb'
          }
        }]
      },
      {
        test: /\.less$/,
        use: ['my-style-loader', 'my-less-loader']
      }
    ]
  },
  plugins: [
    new copyrightWebpackPlugin()
  ]
}