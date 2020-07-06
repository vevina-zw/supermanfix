module.exports = {
    //设置代理
    devServer: {
        open: true,
        // host: 'localhost',
        // port: 8080,
        host: '0.0.0.0',
        port: 8181,
        https: false,
        hotOnly: false,
        proxy: {
            //配置跨域
            '/api': {
                // target: 'https://www.supermanfix.com/smf/api',//接口域名 PRO
                target: 'http://47.100.111.188:8082/smf/api',//接口域名 TEST
                ws: true,// 将主机标头的原点更改为目标URL
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
        before: app => {
        }
    }
}