const express = require('express')
const path = require('path')
const pxToUnit = require('stylus-px-to-relative-unit')
const appData = require('./mock/1.json')
const textcardlist = appData.textcardlist

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  transpileDependencies: ['vue-clamp', 'resize-detector'],
  css: {
    loaderOptions: {
      stylus: {
        use: [
          pxToUnit({
            targetUnit: 'vw',
            ignoreThreshold: 1,
            viewportWidth: 1242,
            viewportHeight: 2208,
            htmlFontSize: 37.5
          })
        ]
      }
    }
  },
  devServer: {
    before (app) {
      app.get('/yiyan/getfeeds', function (req, res) {
        res.json(textcardlist)
      })
      app.use(express.static('./mock/static'))
    }
    //, proxy: {
    //   '/': {
    //     target: 'http://localhost:3000/',
    //     ws: false,
    //     changeOrigin: true
    //   }
    // }
  },
  chainWebpack (config) {
    config.resolve.alias
      .set('@views', resolve('src/views/'))
      .set('@models', resolve('src/models'))
      .set('@components', resolve('src/components'))
      .set('@api', resolve('src/api'))
      .set('@util', resolve('src/util'))
      .set('@common', resolve('src/common'))
      .set('@mixins', resolve('src/common/mixins'))
      .set('@mixins', resolve('src/common/mixins'))
      .set('@js', resolve('src/common/js'))
      .set('@stylus', resolve('src/common/stylus'))
      .set('@store', resolve('src/store'))
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
