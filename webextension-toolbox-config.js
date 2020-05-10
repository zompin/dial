const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const { DefinePlugin } = require('webpack');
const path = require('path');

module.exports = {
  webpack: (config, { dev, vendor }) => {
    const module = { ...config.module };
    const entry = {
      main: './src/js/index.tsx',
      background: './background.ts',
    };

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
    module.rules.push({
      test: /\.tsx?$/,
      loader: 'ts-loader',
      exclude: path.resolve(__dirname, 'node_modules'),
    });
    module.rules.push({
      test: /\.[tj]sx?$/,
      loader: 'eslint-loader',
      exclude: path.resolve(__dirname, 'node_modules'),
    });

    config.resolve.extensions.push('.ts');
    config.resolve.extensions.push('.tsx');

    return {
      ...config,
      entry,
      module,
    };
  },
};
