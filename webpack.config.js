const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { HotModuleReplacementPlugin, DefinePlugin } = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = (_, { mode }) => {
  const isDevelopment = mode === 'development';

  return {
    entry: './src/js/index.jsx',

    optimization: {
      minimizer: [new OptimizeCSSAssetsPlugin()],
    },

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
      publicPath: isDevelopment ? 'https://localhost:3000/' : '/',
    },

    resolve: {
      extensions: ['.jsx', '.js', 'less'],
    },

    module: {
      rules: [
        {
          test: /\.jsx$/,
          loader: 'babel-loader',
          exclude: path.resolve(__dirname, 'node_modules'),
        },
        {
          test: /\.less$/,
          loaders: [
            isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: [autoprefixer],
              },
            },
            'less-loader',
          ],
        },
      ],
    },

    plugins: [
      new DefinePlugin({
        NODE_ENV: isDevelopment ? JSON.stringify('development') : JSON.stringify('production'),
      }),
      new HtmlWebpackPlugin({
        template: './index.html',
        hash: true,
      }),
      new HotModuleReplacementPlugin(),
      new MiniCssExtractPlugin(),
    ],

    devServer: {
      contentBase: isDevelopment ? __dirname : path.join(__dirname, 'dist'),
      disableHostCheck: true,
      port: 3000,
      hot: true,
      https: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
  };
};
