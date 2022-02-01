const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash].css'
    }),
  ]
})
