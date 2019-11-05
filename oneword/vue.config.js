const express = require('express')
const path = require('path')
const pxToUnit = require('stylus-px-to-relative-unit')
const appData = require('./mock/1.json')
const textcardlist = appData.textcardlist
const crosstimelist = require('./mock/3.json').textcardlist
const getuserinfoandbooklist = require('./mock/getuserinfoandbooklist.json')
const getcommentbycard = require('./mock/comment.json')
const getalltextcard = require('./mock/all.json')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  productionSourceMap: false,
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
    // before(app) {
    //   app.get('/yiyan/getfeeds', function(req, res) {
    //     res.json(textcardlist)
    //   })
    //   app.get('/yiyan/getcommentbycard', function(req, res) {
    //     res.json(getcommentbycard)
    //   })
    //   app.get('/yiyan/crosstime', function(req, res) {
    //     res.json(crosstimelist)
    //   })
    //   app.get('/yiyan/getalltextcard', function(req, res) {
    //     res.json(getalltextcard)
    //   })
    //   app.get('/yiyan/getuserinfoandbooklist', function(req, res) {
    //     res.json(getuserinfoandbooklist)
    //   })
    //   app.use(express.static('./mock/static'))
    // },
    proxy: {
      '/yiyan': {
        target: 'http://192.168.1.2:3000/yiyan', // API服务器的地址
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/yiyan': ''
        }
      }
    }
  },
  chainWebpack(config) {
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
    name: 'oneword',
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
