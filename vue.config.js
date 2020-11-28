module.exports = {
    runtimeCompiler: true, //是否使用包含运行时编译器的 Vue 构建版本
    publicPath: '',
    productionSourceMap: false, //不在production环境使用SourceMap
    devServer: {
        //跨域
        port: 9527, // 端口号
        open: false, //配置自动启动浏览器
        proxy: {
            // 配置跨域处理 可以设置多个
            '/api': {
                target: 'http://localhost:8088',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}
