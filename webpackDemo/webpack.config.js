const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
//webpack-dev-server 需要 webpack-cli的版本低于4

module.exports = {
    // JavaScript 执行入口文件,必填,否则报错退出
    // 值可以是 字符串,数组, 对象, 函数, 其中 数组只有最后一项会被导出, 对象才是配置多个入口的
    entry: './main.js',
    // webpack寻找相对路径的文件时会以context为根目录, 默认是执行启动webpack所在的当前工作目录
    // context必须是一个绝对路径的字符串, 还可以配置启动参数 webpack --context
    // context: path.resolve(__dirname, 'app'),
    output: {
        // 把所有依赖的模块合并输出到一个 bundle.js 文件
        filename: 'bundle.js',
        // 输出文件都放到 dist 目录下, 必须是绝对路径
        path: path.resolve(__dirname, './dist'),
        // 配置到线上发布资源的url前缀
        // publicPath:'',

    },
    // 配置webpack如何寻找模块所对应的文件
    resolve: {
        alias: {
            '@components': './src/components',
            'assets$': './src/assets',
        },
        // 导入文件的省略后缀
        extensions: ['.ts', '.js', '.json'],
    },
    // 配置如何处理模块
    module: {
        // 配置模块的读取和解析规则,通常用于配置loader
        rules: [
            {
                // 可以通过test, include, exclude三个配置项命中loader应用规则的文件
                // 用正则去匹配要用该 loader 转换的 CSS 文件, 也可是是个数组
                test: /\.css$/,
                // include: path.resolve(__dirname, '/'),
                // exclude: path.resolve(__dirname, 'node_modules'),
                //use 通过use来应用loader 属性的值需要是一个由 Loader 名称组成的数组，Loader 的执行顺序是由后到前的；
                // 可以通过在loader后加?xxx来配置loader参数, 也可以通过options选项
                // use: ['style-loader',
                //     {
                //         // 可以通过对象的方式进行配置, 
                //         loader: 'css-loader',
                //         options: {
                //             // minimize: true,  //该属性已经不被支持
                //         },
                //         enforce: 'post',//post放到最后执行, pre,放到最前执行
                //     }],
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            // {
            //     test: /\.js$/,
            //     use: ['babel-loader'],
            //     parser: {
            //         amd: false, // 禁用 AMD
            //         commonjs: false, // 禁用 CommonJS
            //         system: false, // 禁用 SystemJS
            //         harmony: false, // 禁用 ES6 import/export
            //         requireInclude: false, // 禁用 require.include
            //         requireEnsure: false, // 禁用 require.ensure
            //         requireContext: false, // 禁用 require.context
            //         browserify: false, // 禁用 browserify
            //         requireJs: false, // 禁用 requirejs
            //     },
            //     // 使用函数，从 Webpack 3.0.0 开始支持
            //     noParse: (content) => {
            //         // content 代表一个模块的文件路径
            //         // 返回 true or false
            //         return /jquery|chartjs/.test(content);
            //     }
            // },
        ]
    },
    plugins: [
        // 有很多配置项, template不配置的话,会使用默认生成的 index.html文件
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        // plugins数组中的每一项都是一个插件的实例,向插件构造函数中传入支持的配置属性
        new MiniCssExtractPlugin({
            attributes: {
                filename: '[name].css',
                chunkFilename: '[id].css',
            },
        }),
    ],
    devServer: {
        // 响应中注入一些http响应头
        // headers: {
        //     'X-foo': 'bar'
        // },
        // DevServer http服务器的文件根目录
        // contentBase: path.join(__dirname, 'public'),
        host: 'localhost',
        port: 8080,
        // 模块热更新
        hot: true,
        // open: true,
        // 单页应用时, 对于使用了 html5 history api
        // historyApiFallback: true,
        // 由多个单页应用组成
        // historyApiFallback: {
        //     // 使用正则匹配命中路由
        //     rewrites: [
        //         // /user 开头的都返回 user.html
        //         { from: /^\/user/, to: '/user.html' },
        //         { from: /^\/game/, to: '/game.html' },
        //         // 其它的都返回 index.html
        //         { from: /./, to: '/index.html' },
        //     ]
        // }
    },
    // devtool: 'source-map',
};