let path = require('path');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = env => {
    let { production } = env;
    let development = !production;

    return {
        entry: {
            bundle: './src/js/index.jsx',
        },

        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].js'
        },

        module: {
            rules: [{
                test: /\.jsx$/,
                loader: 'babel-loader'
            }, {
                test: /\.less$/,
                loaders: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
            }]
        },

        plugins: [
            new MiniCssExtractPlugin({
                filename: '[name].css'
            }),
        ],

        resolve: {
            extensions: ['.js', '.jsx', '.css', '.less'],
        },

        watch: development,

        devtool: development && 'cheap-inline-module-source-map'
    };
};