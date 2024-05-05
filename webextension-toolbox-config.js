const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  copyIgnore: ['**/*.less'],
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

    module.rules.push({
      test: /\.less$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [autoprefixer],
            }
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
