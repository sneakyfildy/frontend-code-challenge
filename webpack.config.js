var webpack = require('webpack');
var path = require('path');
var currentDir = process.cwd();
var MinifyPlugin = require("babel-minify-webpack-plugin");

module.exports = {
    resolve: {
        mainFields: ["main", "webpack"],
        modules: [
            currentDir,
            path.resolve(currentDir, 'node_modules'),
            'node_modules',
            'src'
        ],
        extensions: ['.ts', '.js', '.json'],
        alias: {
        }
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [{
                    loader: 'awesome-typescript-loader',
                    options: {
                        ignoreDiagnostics: [
                            2300 // omit 'TS2300: Duplicate identifier' type of errors
                        ]
                    }
                }]
            },
            {
                test: /\.html$/,
                loader: 'raw-loader',
                exclude: [path.join(currentDir, '/app/base.html')]
            },
            {
                test: /\.css$/,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader'}
                ]
            },
            {
                test: /\.(png|jpg|svg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 81920,
                        name: '[name].[ext]',
                      }
                }
            }
        ]
    },
    plugins: {
        provide: new webpack.ProvidePlugin({
        }),
        vendorChunks: new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.bundle.js',
            minChunks: function(module){
                var res;
                try {
                    res = module.resource.match(/static\\js\\vendor|static\/js\/vendor|node_modules|chart\/vendor|chart\\vendor/);
                }catch(err){
                    //console.error(module + ' is screwed up; res = ' + module.resource);
                }
                return res;
            }
        }),
        minify: new MinifyPlugin({
            mangle: false
        })
    }
};
