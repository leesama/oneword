// 设置相应缓存的名字的前缀和后缀
workbox.core.setCacheNameDetails({
  prefix: 'one-word',
  suffix: 'v1.0.0'
})
// 让我们的service worker尽快的得到更新和获取页面的控制权
workbox.skipWaiting()
workbox.clientsClaim()

// 删除旧版数据 此API是workbox4.0的
// workbox.precaching.cleanupOutdatedCaches()
/*
 * vue-cli3.0通过workbox-webpack-plagin 来实现相关功能，我们需要加入
 * 以下语句来获取预缓存列表和预缓存他们，也就是打包项目后生产的html，js，css等* 静态文件
 */
workbox.precaching.precacheAndRoute(self.__precacheManifest || [])

// precacheAndRoute将采用缓存优先策略，这里我们请求的字体将使用缓存策略
workbox.precaching.precacheAndRoute(['font.css'])

// workbox.routing.registerRoute(
//   new RegExp('.*experiments?.*'),
//   workbox.strategies.networkFirst()
// )
// workbox.routing.registerRoute(
//   new RegExp('.*experiments/\\d'),
//   workbox.strategies.networkFirst()
// )
// workbox.routing.registerRoute(
//   new RegExp('.*experiment_types.*'),
//   workbox.strategies.networkFirst()
// )
