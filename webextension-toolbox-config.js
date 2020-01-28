const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const { DefinePlugin } = require('webpack');

module.exports = {
  webpack: (config, { dev, vendor }) => {
    const entry = './src/js/index.jsx';
    const module = { ...config.module };

    if (!Array.isArray(module.rules)) {
      module.rules = [];
    }

    config.plugins.push(new MiniCssExtractPlugin());
    config.plugins.push(
      new DefinePlugin({
        NODE_ENV: dev ? JSON.stringify('development') : JSON.stringify('production'),
        VENDOR: JSON.stringify(vendor),
      }),
    );

    module.rules.push({
      test: /\.less$/,
      loaders: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            plugins: [autoprefixer],
          },
        },
        'less-loader',
      ],
    });

    return {
      ...config,
      entry,
      module,
    };
  },
};
