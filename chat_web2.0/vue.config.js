'use strict'
const path = require('path')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const defaultSettings = require('./src/settings.js')

function resolve (dir) {
    return path.join(__dirname, dir)
}

const name = defaultSettings.title // page title
const port = process.env.port || process.env.npm_config_port || 9528 // dev port
const IS_DEV = process.env.NODE_ENV === 'development'
const IS_PRO = process.env.NODE_ENV === 'production'
function getAppName () {
    if (process.env.VUE_APP_ENTRY == 'SELLER') {
        return '爱洽客服-商户端'
    }
    if (process.env.VUE_APP_ENTRY == 'SERVER') {
        return '爱洽客服-客服端'
    }
}
function getAppId () {
    if (process.env.VUE_APP_ENTRY == 'SELLER') {
        return 'com.aichatseller.app'
    }
    if (process.env.VUE_APP_ENTRY == 'SERVER') {
        return 'com.aichatserver.app'
    }
}
function getOutput () {
    if (process.env.VUE_APP_ENTRY == 'SELLER') {
        return 'dist_electron_seller'
    }
    if (process.env.VUE_APP_ENTRY == 'SERVER') {
        return 'dist_electron_server'
    }
}
function getProductName () {
    if (process.env.VUE_APP_ENTRY == 'SELLER') {
        return 'aichat-seller'
    }
    if (process.env.VUE_APP_ENTRY == 'SERVER') {
        return 'aichat-server'
    }
}
function getNsis () {
    if (process.env.VUE_APP_ENTRY == 'SELLER') {
        return './build/sellerinstaller.nsh'
    }
    if (process.env.VUE_APP_ENTRY == 'SERVER') {
        return './build/serverinstaller.nsh'
    }
}
function getNavigatorIcon () {
    if (process.env.VUE_APP_NAVITAGOR == 'WIN') {
        if (process.env.VUE_APP_ENTRY == 'SELLER') {
            return './build/seller.ico'
        }
        if (process.env.VUE_APP_ENTRY == 'SERVER') {
            return './build/server.ico'
        }
    }
    if (process.env.VUE_APP_NAVITAGOR == 'MAC') {
        if (process.env.VUE_APP_ENTRY == 'SELLER') {
            return './build/seller_mac.ico'
        }
        if (process.env.VUE_APP_ENTRY == 'SERVER') {
            return './build/server_mac.ico'
        }
    }
}

module.exports = {
    outputDir: 'dist',
    assetsDir: 'static',
    lintOnSave: IS_DEV,
    productionSourceMap: IS_PRO,
    css: {
        extract: true,
        sourceMap: IS_DEV
    },
    devServer: {
        port,
        open: false,
        overlay: {
            warnings: false,
            errors: true
        },
    },
    configureWebpack: {
        // provide the app's title in webpack's name field, so that
        // it can be accessed in index.html to inject the correct title.
        // 关闭 webpack 的性能提示
        // performance: {
        //   hints:false
        // },
        // 警告 webpack 的性能提示
        performance: {
            hints: 'warning',
            // 入口起点的最大体积
            maxEntrypointSize: 50000000,
            // 生成文件的最大体积
            maxAssetSize: 30000000,
            // 只给出 js 文件的性能提示
            assetFilter: function (assetFilename) {
                return assetFilename.endsWith('.js')
            }
        },
        name,
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    },
    chainWebpack (config) {
        // it can improve the speed of the first screen, it is recommended to turn on preload
        config.plugin('preload').tap(() => [
            {
                rel: 'preload',
                // to ignore runtime.js
                // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
                fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
                include: 'initial'
            }
        ])

        // when there are many pages, it will cause too many meaningless requests
        config.plugins.delete('prefetch')

        // set svg-sprite-loader
        config.module.rule('svg').exclude.add(resolve('src/icons')).end()
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end()

        // 压缩css
        config.optimization
            .minimizer('css')
            .use(OptimizeCSSAssetsPlugin, [{ cssProcessorOptions: { safe: true } }])

        config.when(!IS_DEV, (config) => {
            config
                .plugin('ScriptExtHtmlWebpackPlugin')
                .after('html')
                .use('script-ext-html-webpack-plugin', [
                    {
                        // `runtime` must same as runtimeChunk name. default is `runtime`
                        inline: /runtime\..*\.js$/
                    }
                ])
                .end()
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
                    commons: {
                        name: 'chunk-commons',
                        test: resolve('src/components'), // can customize your rules
                        minChunks: 3, //  minimum common number
                        priority: 5,
                        reuseExistingChunk: true
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
    pluginOptions: {
        electronBuilder: {
            preload: "src/preload.js",
            builderOptions: {
                "productName": getProductName(),		//项目名 这也是生成的exe文件的前缀名
                "appId": getAppId(),	//包名
                "copyright": "Copyright © 2022",			//版权信息
                "directories": { 			//输出文件夹
                    "output": getOutput()
                },
                "nsis": {	//nsis相关配置，打包方式为nsis时生效
                    "oneClick": false, 								    // 是否一键安装
                    "allowElevation": true, 							// 允许请求提升，如果为false，则用户必须使用提升的权限重新启动安装程序。
                    "allowToChangeInstallationDirectory": true, 		// 允许修改安装目录
                    "installerIcon": getNavigatorIcon(),			    // 安装图标
                    "uninstallerIcon": getNavigatorIcon(),		    //卸载图标
                    "installerHeaderIcon": getNavigatorIcon(), 	    // 安装时头部图标
                    "createDesktopShortcut": true, 					    // 创建桌面图标
                    "createStartMenuShortcut": true,					// 创建开始菜单图标
                    "shortcutName": getAppName(), 							// 图标名称
                    "include": getNsis(), 			// 包含的自定义nsis脚本
                },
                // "publish": [
                //     {
                //         "provider": "generic", 		// 服务器提供商，也可以是GitHub等等
                //         "url": "http://xxxxx/" 		// 服务器地址
                //     }
                // ],
                "win": {
                    "icon": getNavigatorIcon(),
                    "target": [
                        {
                            "target": "nsis",			//使用nsis打成安装包，"portable"打包成免安装版
                            "arch": [
                                "ia32",				//32位
                                "x64" 				//64位
                            ]
                        }
                    ]
                },
                "mac": {
                    "icon": getNavigatorIcon()
                },
                "linux": {
                    "icon": getNavigatorIcon()
                }
            }
        }
    }
}
