const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
    entry: {
        index: "./resources/js/app.js",
    },
    module: {
        rules: [
            // babel
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        plugins: ["@babel/plugin-proposal-class-properties"],
                        presets: ["@babel/preset-env"]
                    },
                },
            },
            // fonts
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts',
                        }
                    }
                ],
            },
            // less
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
            },
            // css
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "public", "build"),
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(),
        // new CopyPlugin({
        //     patterns: [
        //         {
        //             from: path.resolve(__dirname, "resources", "images"),
        //             to: path.resolve(__dirname, "public", "build", "images")
        //         },
        //     ],
        // }),
    ],
    resolve: {
        modules: [
            path.resolve(__dirname, "resources"),
            "node_modules"
        ],
    },
    watch: true,
};
