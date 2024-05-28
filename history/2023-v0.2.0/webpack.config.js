// 导入path模块
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {

  entry: './src/main.js',

  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },

  module: {
    rules: [
        {
          test: /\.less$/,
          use: [MiniCssExtractPlugin.loader,"css-loader","less-loader"]
        }
    ]
  },

  plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html"
      }),
      new MiniCssExtractPlugin({
        filename: "style.css",
      }),
      new CssMinimizerPlugin()
  ],


  devServer: {
    host: "localhost", 
    port: "80", 
    open: true, 
  },

  mode: "production"
};
