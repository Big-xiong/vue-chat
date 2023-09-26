const path = require("path");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
function resolve (dir) {
    return path.join(__dirname, dir)
}
const IS_DEV = process.env.NODE_ENV === 'development'
const IS_PRO = process.env.NODE_ENV === 'production'

module.exports = {
    lintOnSave: IS_DEV,
    productionSourceMap: IS_PRO,
    css: {
        extract: true,
        sourceMap: IS_DEV
    },
    pluginOptions: {
        i18n: {
            locale: "cn",
            fallbackLocale: "cn",
            localeDir: "i18n/",
            enableInSFC: true,
        },
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    },
    chainWebpack: (config) => {
        config.plugin("html").tap((args) => {
            args[0].title = "AIChat爱洽客服";
            args[0].favicon = path.resolve("public/favicon.ico");
            return args;
        });
        // 压缩css
        config.optimization
            .minimizer('css')
            .use(OptimizeCSSAssetsPlugin, [{ cssProcessorOptions: { safe: true } }])

        config.when(!IS_DEV, (config) => {
            config.optimization.splitChunks({
                chunks: 'all',
                cacheGroups: {
                    libs: {
                        name: 'chunk-libs',
                        test: /[\\/]node_modules[\\/]/,
                        priority: 10,
                        chunks: 'initial' // only package third parties that are initially dependent
                    },
                    elementUI: {
                        name: 'chunk-elementUI', // split elementUI into a single package
                        priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                        test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                    },
                    styles: {
                        name: 'style',
                        test: /\.css$/,
                        minChunks: 2,
                        priority: 5,
                        reuseExistingChunk: true,
                        enforce: true
                    }
                }
            })
            // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
            config.optimization.runtimeChunk('single')
        })
    },
    devServer: {
        proxy: {
            "/socket.io": {
                target: process.env.VUE_APP_API_BASE,
                ws: true,
                changeOrigin: true,
            },
            "sockjs-node": {
                target: process.env.VUE_APP_API_BASE,
                ws: false,
                changeOrigin: true,
            },
        },
    },
};
