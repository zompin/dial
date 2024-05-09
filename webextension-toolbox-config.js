const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  copyIgnore: ['**/*.css', '**/manifest.json'],
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
      test: /\.module.scss/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            esModule: true,
            modules: {
              namedExport: true,
              localIdentName: '[name]__[local]__[hash:base64:5]'
            },
          },
        },
        'sass-loader',
      ],
    });


    return {
      ...config,
      entry,
      module,
    };
  },
};
