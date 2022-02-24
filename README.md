<p align="center">
  <a href="#简介">简介</a>&nbsp;|&nbsp;<a href="#项目细节">项目细节</a>
</p>

![](https://img.shields.io/badge/版本-1.0.0-lightgrey.svg)
![](https://img.shields.io/badge/前端脚手架-vuecli3-lightgrey.svg)
![](https://img.shields.io/badge/后端-koa2.8-lightgrey.svg)
![](https://img.shields.io/badge/license-MIT-lightgrey.svg)
![](https://img.shields.io/badge/developer-@leesama-lightgrey.svg)

## 简介

OneWord 是个人的练习之作，页面结构尽可能仿照ios端app 一言

[点击打开一言appstore链接](https://apps.apple.com/cn/app/一言-记录字句-发现共鸣/id1010174792)

>  **Note**: 开发期间该APP改版过几次，部分细节有变化

前端采用vue+vuex+vue-router，使用了部分PWA特性

后端采用koa2，数据库使用postgress,redis用于保存session

服务器部署在阿里云，采用nginx进行端口转发，又拍云做CDN加速，使用HTTPS协议

### 线上 Demo

已失效

#### 移动端 访问注意事项：

ios端如果在safari浏览器下访问，点击浏览器下方分享按钮，添加到主屏幕
Android端 也可以添加到桌面，具体方式请自行尝试


#### PC端 访问注意事项

网站目前没有做PC端适配，建议在调试模式下测试效果

>  **Note**: 请尽可能使用移动端添加到桌面方式访问，可得到媲美原生APP的体验
## 目前实现的主要功能

所在路由或组件|触发条件|效果
---|:--:|:---
/login||登录注册
/home|点击右上角|进入/crosstie
所有卡片|点击卡片顶部或中部|进行过度动画跳转到card-container
所有卡片|点击卡片底部|点击评论图标跳转到/comment，点击喜欢图标喜欢，再次点击不喜欢（点击喜欢不喜欢之后跳转到/comment相应参数也会改变）
音乐卡片|点击播放按钮|点击播放音乐，右下角显示转盘，点击转盘，跳转到音乐相关信息；点击暂停音乐，右下角转盘消失，音乐暂停；进入cardcontainer中对应的音乐卡片，可拖动进度条跳转音乐，暂停音乐；点击其他音乐，切换到其他音乐
card-container||左右滑动切换卡片，点击返回，回到上一个页面，并跳转到之前切换到的卡片，
查看新添加的卡片|左滑或者下拉刷新|
/home  /crosstime|在卡片区域滑动|快速滑动 ，滑动越快，要滑动到的卡片位置越靠前或者越靠后，如果要滑动到的卡片位置超过了卡片最大位置索引，滑动到loading动画位置，更新数据；拖动，放手的时候如果拖动的距离大于1/4VW，滑动到上一张或者下一张，否则返回之前的一张卡片
/choose-crosstime||点击左侧月份，用户点击任意一天会跳转到相对应日期的所有卡片（目前数据太少未实现跳转对应日期的所有卡片，默认显示所有卡片）并且点击后localStorage会存储用户此次点击记录，点击的那个日期项会永久变成灰色，除非用户删除localStorage
scroll-x scrol-y-cards | 滚动初始点向右滑动或者往下滑动| 每次滑动从初始点滑动时动画项的初始位置都会打乱 ；快速滑动或者滑动到阈值会触发刷新；请求时间小于600ms，会延迟到600ms动画才会回弹，没有数据了会显示END 
 /commen                |         点击底部输入框         | 发送评论，评论会发送成功会马上更新到评论界面，并且返回卡片界面，评论数也会更新，不会再次请求数据 
 /commen                |          点击别人评论          | 弹出drawer，可复制，回复别人评论，点击右侧图标可点赞别人评论 
 /commen                |         点击自己的评论         | 弹出drawer，可复制，删除评论，点击右侧图标会提示不能点赞自己的评论 
 /explore/all           |            左右滑动            | 顶部下方动画会跟随滑动滑动 
 /mine                  |            点击头像            | 底部背景模糊，编辑用户资料，点击头像图片，选择图片，选择图片裁切区域，裁切图片，点击完成，上传修改 
 /mine                  |          点击退出登录          | 退出登录，清除cookie，重置vuex为初始值 
 /mine                  |          点击新建文集          | 弹出新建文集页面，点击文集封面图，选择图片，选择图片裁切区域，裁切图片，点击完成，上传保存 
 /new-word              | 发布图文 | 正文为必填项，私密下方文字会根据是否勾选私密切换内容，选择分类为文字归类，点击添加图标，选择文字图片； 
 /new-word | 选择存入文集 | 选择存入文集，也可以新建文集 
 /new-word | 选择样式 | 点击第一排图标，切换横向排列文字或者竖向排列，竖向排列时，无法点击最后一排的第三个切换对齐方式图标，此时只有默认对齐方式；点击最后一排图标，第一个图标，切换图片圆形或者矩形铺满，点击切换后，会有过渡动画，点击第二个图标，切换字体，一共有五种字体可供选择，点击第三个图标，切换文字对齐方式，左对齐或者居中 





## 项目细节

### 前端

#### 获取设计参数与MOCK数据方式

应用内截图，通过设计软件测量各区域的长宽颜色等各种值

应用内录屏，逐帧查看测量各区域的长宽颜色等各种值

mock数据 通过用fiddler4抓包

#### pwa

pwa在项目中是为了让应用全屏化 ，通过workbox将字体文件设置为采用缓存优先策略

#### 字体

~~通过 https://www.likefont.com/  找到相似字体
通过 https://transfonter.org/formats 将字体转换为Base64格式
网站加载后 将其挂载在head标签~~

base64格式字体文件在ios端中英文中线无法居中，遂直接采用ttf格式字体文件，使用FontFace APi异步加载字体文件

https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/webfont-optimization#font_loading_api

#### 图标
www.iconfont.cn
使用iconfont图标

#### 布局
宽高采用vw，使用stylus-px-to-relative-unit包，配置后可直接设置为测量值，stylus-px-to-relative-unit会将其自动转换为vw值，布局大部分采用flex布局，少部分采用grid布局

#### 基础库

better-scroll animatejs axios等

#### 组件

所有ui组件均自行设计，只要是需要用到两次及以上的部分都会拆分为组件，下面分析重要组件

##### card组件

card组件是应用的核心，分为两大类，根据卡片类型将其归类为card-music和card-text ， 对应音乐卡片和文字卡片，两种卡片有很多相似点，将其中相似区域拆分为card-base组件，通过props传入不同的值展示不同的内容

###### 音乐卡片

音乐卡片有两种，根据卡片类型将其归类为card-fixed-music、card-detail-music对应固定音乐卡片、细节音乐卡片，音乐卡片，除了使用部分card-base基础组件还使用了music-player、music-player-control、music-process-bar三个其特有的组件

music-player组件会监听vuex中musicSrc、currentTime、playing ，对应音乐路径，当前播放时间，音乐播放状态，当musicSrc改变 切歌；当currentTime改变，说明用户在拖动进度条跳转到拖动的音乐进度；当playing状态改变，播放或者暂停歌曲 

music-player-control组件，监听vuex中的musicSrc，如果musicSrc和当前控制器记录的musicSrc一致，切换播放暂停状态，点击该组件，会commit 播放暂停状态到vuex

music-process-bar 组件，监听vuex中的musicSrc，如果musciSrc和当前进度条记录的musicSrc一致，进度条会监听vuex中的currentTime，如果之前的musicSrc和当前进度条记录的musicSrc一致，说明现在切掉了这首歌，取消之前的监听事件，初始化一些状态

###### 文字卡片

文字卡片有三种，根据卡片类型将其归类为card-flex-text、card-fixed-text、card-detail-text 对应自适应卡片、固定文字卡片、细节文字卡片，除了使用部分card-base基础组件还使用了card-base-content-horizontal、card-base-content-vertical两个其特有的组件，用于文字水平布局和垂直布局

##### cardContainer组件

该组件用于点击卡片后执行一个过渡动画，切换到card-detail，左右滑动可以切换目前加载到的所有卡片

由于使用了betterscroll ，该库通过transfrom模拟原生APP内部的滚动滑动效果，但是transform 会形成一个新的上下文环境，脱离了文档流，动画需要逐渐隐藏所有其他元素，将card元素前置并移动到中部，然后再显示card-detail，需要设置z-index,由于zindex的层级是只针对当前文档流的，也就是设置index，不会影响transform之外的文档流，那么肯定不能在transform的文档流中运行动画，这里一般思路是将其放置在根组件同级位置，每次点击通过vuex传递要移动的卡片信息，生成新的卡片来执行动画，这里我采用获取transform坐标然后移除tranform，使用获取到的坐标通过position定位，动画执行完毕再将其设置成以前的transform坐标

##### crosstime组件

穿越组件用于穿越页面，拆分为两部分，左侧为crosstime-month，右侧为crosstime-date，crosstime-month中的月份项点击后会携带月份信息触发monthChange事件，crosstime-date可以通过props接收到月份信息，根据信息改变crosstime-date组件的日期信息，展示这个月的每一天，用户点击任意一天会跳转到相对应日期的所有卡片（目前数据太少未实现跳转对应日期的所有卡片，默认显示所有卡片）并且点击后localStorage会存储用户此次点击记录，点击的那个日期项会永久变成灰色，除非用户删除localStorage

##### imageClipper组件

该组件基于vue-cropper组件

##### scroll组件

scrollbase组件基于better-scroll,绝大多数页面都使用了该组件

scroll-x和scroll-y-cards将card和其他元素高度封装到了一起，因为多个页面会用到，使用是只需要传入相关参数如下，通用性和实用性非常高

```html
      <scroll-y-cards
        ref="scroll"
        :pullUp="true"
        @pullUp="handlePullUp"
        :pullDown="true"
        @pullDown="handlePullDown"
      />
```

scroll-y   较之 scroll-y-cards 只是没有嵌入card相关组件，更具用通用性。

###### loading动画

scroll-x、scroll-y均有loading动画，滚动到一定值会触发刷新事件，根据观察原APP，每次下拉或者右滑动组件loading动画项的起始位置都不一样，但结束位置都是一样的,这里用一个数组来记录每个动画项需要移动到的位置参数

```      js
  // 用来记录每一条动画中的li的长度，需要偏转的角度，位置，x轴偏移量，y轴偏移量
      list: [
        [LONG_LINE_HEIGHT, 90, 0, -22, 0],
        [LONG_LINE_HEIGHT, 50, 1, -10, 0],
        [LONG_LINE_HEIGHT, 90, 2, 2, 0],
        [LONG_LINE_HEIGHT, 65, 3, 5, 0],
        [SHORT_LINE_HEIGHT, 0, 4, 20, 0],
        [LONG_LINE_HEIGHT, 115, 5, 35, 0],
        [SHORT_LINE_HEIGHT, 135, 6, 40, -5],
        [SHORT_LINE_HEIGHT, 90, 7, 55, 4],
        [SHORT_LINE_HEIGHT, 45, 8, 70, -5],
        [LONG_LINE_HEIGHT, 90, 9, 30, 0],
        [SHORT_LINE_HEIGHT, 145, 10, 25, -5],
        [SHORT_LINE_HEIGHT, 90, 11, 40, 4],
        [SHORT_LINE_HEIGHT, 45, 12, 55, -5]
      ]
```

监听滚动事件，每次滚动的值大于0，就去打乱list，更新dom之后，拿到dom并缓存起来，如果已经缓存起来了就不打乱更新dom了，滚动结束就清空缓存的dom。滚动过程中根据滚动的值实时变换动画

###### loading动画在请求到数据后再结束

scroll-y中loading动画在请求到数据后再结束，如果单单实现这个一个效果是很简单的，直接使用bs 的pulldown库，基本满足需求，但必须要达到阈值才能触发，原APP当执行快速下拉时也会触发，查看pulldown源码下拉相关代码

```js
    if (!this.pulling) {
      this.pulling = true
      this.scroll.trigger('pullingDown')

      this.originalMinScrollY = this.scroll.minScrollY
      this.scroll.minScrollY = stop
    }

```





使用了minScrollY 设置了下拉的停顿坐标，并触发了下拉事件，参考其定义了一个手动触发函数，快速下拉时执行该函数


###### 卡片根据滑动的距离移动到中部

scroll-x中滚动开始前保存开始时间和当前滚动的位置，滚动结束时计算这次滚动用时和滚动距离，用时小于200ms滚动距离大于20，就会触发快速滑动卡片，卡片会根据滚动距离的多少滚动n张，其他情况也就是慢速滚动的时候卡片跟随手指移动，手指松开时，获取当前卡片距离左右两侧的距离，根据距离判断该滑动到左侧或者右侧

#### Model

通过闭包封装axios,封装成基础的两个post、get方法，用于post、get请求，如果请求过程中出错会弹出toast报错

拦截axios请求，如果此时是需要显示loading的请求显示请求动画，响应后关闭请求动画

#### Vuex

使用了modules，将数据分为3类，card、common、music，分别对应卡片信息，公用信息、音乐信息。

定义了mutation-types.js 文件来存储mutation名称常量

其中card中有10种卡片数据，对应10个页面，为评论页面创建了增加评论数mutation，获取卡片信息的getter，为每个card页面创建了设置卡片信息的mutation

RESET_CARD_STATE mutation 用于用户退出登陆之后重置mutation为初始值

#### 页面切换动画

路由元信息上绑定index 用来判定是进入还是退出，执行相对应的动画

#### keepalive状态切换

根据路由路径动态设置keep-alive组件的exclude props


#### router

路由模式 history
路由守卫 登录鉴权


#### plugins

实现toast

#### mixins

由于有多种卡片且卡片都相似方法，将其抽离出来作为mixin

#### 其他问题解决方案

css中设置   -webkit-tap-highlight-color: transparent 移除IOS端点击后高亮效果
css中设置  touch-action: manipulation;解决点击300ms问题

### 后端

#### 配置文件

env.js  

#### 登录注册
passport+koa-redis+koa-session

#### 自定义的中间件

catchError.js 用于捕获异常
changeStaticPath.js 用于修改请求的静态目录路径
decode.js 用于解码请求
isLogin.js 用于判断用户是否登录，绝大多数API需要登录才能访问
normalBody.js 用于在ctx上添加相应方法

#### 数据库

使用sequelize 操作 postgress数据库 

/onewordback/dbs/models 目录中book.js card.js comment.js user.js 中分别定义了书籍表、卡片表、评论表、用户表并在associtate.js中设置了关联
#### 服务器

nginx 转发80端口到443 
/yiyan/ 路径的请求代理到pm2管理的本地3000端口服务上
/js/png/mp3 缓存过期时间为30天

nginx 部分配置文件如下

```nginx

        location / {
              if ($request_filename ~* .*\.(?:htm|html)$)
                  {
                    add_header Cache-Control "private, no-store, no-cache, must-revalidate, proxy-revalidate";
                  }
                 if ($request_filename ~* .*\.(?:js|css|png)$)
                 {
                   expires      30d;
                 }
            root   /root/oneword/;
            index  index.html index.htm;
            try_files $uri $uri/ /index.html;
        }
        location /yiyan/ {
            if ($request_filename ~* .*\.(?:jpg|mp3)$)
            {
                  expires      30d;
            }
            if ($request_filename ~* .*\.(?:ttf)$)
            {
                  expires      365d;
            }

            proxy_pass http://localhost:3000;
        }
```

#### cdn

又拍云使用默认设置
