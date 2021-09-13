module.exports = {
    entry: {
        // 配置入口文件
        main: path.resolve(__dirname, '../src/main.js')
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'scss']
            }
        ]
    }
},