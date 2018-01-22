const path = require('path');

module.exports = {
    //entry Point
    entry: path.resolve(__dirname) + '/src/index.js',
    output: {
        path: path.resolve(__dirname,'dist') + '/app',
        filename: 'compact.js',
        publicPath: '/app/'
    },
    module: {
        loaders:[
            {
                test: /\.js$/,
                include: path.resolve(__dirname,'src'),
                loader: 'babel-loader',
                query: {
                    presets: ['react','es2016']
                }
            }
        ]
    }

}