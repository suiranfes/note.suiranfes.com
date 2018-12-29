module.exports = {
    entry: ['@babel/polyfill', './theme/js/main.js'],
    output: {
        filename: "main.js"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    module:{
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['transform-remove-strict-mode'],
                        compact: false
                    }
                }
            }
        ],
    },
    mode: 'production',
}