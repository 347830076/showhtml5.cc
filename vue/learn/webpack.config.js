// var webpack = require('webpack');
module.exports = {
    entry : {
        bundle:'./js/main.js',
        bundle1:'./js/main1.js',
    },
    output:{
        filename:'./js/[name].js'
    },
    module:{
        loaders:[
            {
                test:/\.css$/,
                loader:'style-loader!css-loader'
            },
            {
                test:/\.(png|jpg|gif|jepg)$/,
                loader:'url-loader?limit=8192' //这里需要说明的是limit ，它的左右是如果图片的大小，小于8192bytes就以Data URL的形式引入图片，大于就用图片地址引用。
            }
        ],
        // plugins:[
        //     new webpack.optimize.UglifyJsPlugin({
        //         compress:{
        //             warnings:false
        //         }
        //     })
        // ],
        devServer:{
            contentBase:'./', //本地服务器所加载的页面所在目录
            host:'192.168.1.30', //本地IP地址
            colors:true, //终端输出的结果为彩色
            historyApiFallback:true, //不跳转
            inline : true, //实时刷新
            port:'3333' //端口号
        }
    }
};