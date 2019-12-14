var path = require('path');
var webpack = require('webpack');
var fs = require('fs');


module.exports = {
    mode: 'development',
    // devtool: 'inline-source-map',
    devtool: 'eval' ,
    entry: [
        'webpack-hot-middleware/client',
        'webpack/hot/only-dev-server',
        './src/index-dev'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: [
                    'babel-loader'
                ],
                include: [
                  
                    path.join(__dirname, 'src'),
                ]
            }
        ]
    }
};