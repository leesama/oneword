// const webpack = require('webpack')
const path = require('path')
const pxToUnit = require('stylus-px-to-relative-unit')
// const appData = require('./data.json')
// const seller = appData.seller
// const goods = appData.goods
// const ratings = appData.ratings

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  //   css: {
  //     loaderOptions: {
  //       stylus: {
  //         'resolve url': true,
  //         import: ['./src/theme']
  //       }
  //     }
  //   },
  //   pluginOptions: {
  //     'cube-ui': {
  //       postCompile: true,
  //       theme: true
  //     }
  //   },
  //   devServer: {
  //     before (app) {
  //       app.get('/api/seller', function (req, res) {
  //         res.json({
  //           errno: 0,
  //           data: seller
  //         })
  //       })
  //       app.get('/api/goods', function (req, res) {
  //         res.json({
  //           errno: 0,
  //           data: goods
  //         })
  //       })
  //       app.get('/api/ratings', function (req, res) {
  //         res.json({
  //           errno: 0,
  //           data: ratings
  //         })
  //       })
  //     }
  //   },
  css: {
    loaderOptions: {
      stylus: {
        use: [
          pxToUnit({
            targetUnit: 'vw',
            ignoreThreshold: 1,
            viewportWidth: 1080,
            viewportHeight: 1920,
            htmlFontSize: 37.5
          })
        ]
      }
    }
  },
  devServer: {
    proxy: {
      '/': {
        target: 'http://localhost:3000/',
        ws: false,
        changeOrigin: true
      }
    }
  },
  chainWebpack (config) {
    config.resolve.alias
      .set('@views', resolve('src/views/'))
      .set('@models', resolve('src/models'))
      .set('@components', resolve('src/components'))
      .set('@api', resolve('src/api'))
      .set('@util', resolve('src/util'))
  },
  pwa: {
    name: 'My App',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',

    // configure the workbox plugin
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // 自定义的service worker文件的位置
      swSrc: 'src/service-worker.js'
      // ...other Workbox options...
    }
  }
}
