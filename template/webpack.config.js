const path = require('path')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const env = process.env.NODE_ENV || 'beta';

const html = glob.sync('./src/pages/**/*.html').map(item => {
  return new HtmlWebpackPlugin({
    data: {
      env
    },
    filename: item.substr(6),
    template: item,
    inject: false,
    minify: (env === 'production' && {
      caseSensitive: true,
      collapseBooleanAttributes: true,
      collapseInlineTagWhitespace: true,
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
      preserveLineBreaks: true,
      quoteCharacter: '"',
      removeComments: true,
      removeRedundantAttributes: true,
      sortAttributes: true,
      sortClassName: true,
      useShortDoctype: true,
    })
  })
})

const js = glob.sync('./src/pages/**/*.js').reduce((prev, curr) => {
  prev[curr.slice(6, -3)] = curr
  return prev
}, {})

module.exports ={
  entry: js,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js'
  },
  module: {
    rules: [{
      test: /\.(js|vue)$/,
      loader: 'eslint-loader',
      enforce: 'pre',
      include: path.resolve(__dirname, 'src'),
      options: {
        formatter: require('eslint-friendly-formatter')
      }
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.(png|jpe?j|gif|svg)(\?.*)?$/,
      loader: 'url-loader' // IMPROVE: add limit
    }, {
      test: /\.vue$/,
      loader: 'vue-loader'
    }]
  },
  resolve: {
    extensions: ['.js', '.vue']
  },
  plugins: [
    new CleanWebpackPlugin(['dist'])
  ].concat(html),
  devServer: {
    contentBase: './dist'
  }
}
