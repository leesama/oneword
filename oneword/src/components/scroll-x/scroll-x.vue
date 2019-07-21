<template>
  <base-scroll
    :probeType="3"
    :listenScroll="true"
    :scrollX="true"
    @scroll="scroll"
    :beforeScroll="true"
    @beforeScroll="beforeScroll"
    ref="baseScroll"
  >
    <div class="scroll-content">
      <ul ref="itemlist">
        <li v-for="(item, index) in list" :style="{height: item[0] }" :key="index"></li>
      </ul>
      <slot></slot>
    </div>
  </base-scroll>
</template>

<script>
import BaseScroll from '@components/scroll-base/scroll-base'
const LONG_LINE_HEIGHT = '20px'
const SHORT_LINE_HEIGHT = '10px'
// scroll滚动的距离
const scrollX = 60
// 动画的x轴移动的距离
const animationX = 60

export default {
  name: 'scroll-x',
  data () {
    return {
      data: {
        textcardlist: [
          {
            picpath:
              'http://jhyiyan.oss-cn-beijing.aliyuncs.com/2019/07/16/06913ef06d7e7032997a3c0b07b07771.jpg',
            ava: '1',
            commentcnt: '460',
            commercialtag: '-1.0',
            from: '木心',
            originbook: {
              picpath:
                'http://115.28.168.103:8080/yiyanpic/pic/2015/07/16/5a5e712609939bbaa67581c19e7ef9b0.jpg',
              bookid: '119',
              ava: '1',
              cardcnt: '1041',
              bookname: '给你的情书'
            },
            textcardid: '2998179',
            // 字体
            fonttype: '1',
            collectcnt: '196',
            creator: {
              uid: '9999',
              username: '一言',
              device: '0',
              gender: 'M',
              fanscnt: '0',
              smallavatar:
                'http://115.28.168.103:8080/yiyanpic/avatar/2015/06/22/26de07660a311398e1a2ec419df7575d_.jpg',
              largeavatar:
                'http://115.28.168.103:8080/yiyanpic/avatar/2015/06/22/26de07660a311398e1a2ec419df7575d.jpg'
            },
            content: '还没分别，\n已在心里写信。',
            feedid: '7197800',
            // 类型
            category: '1000',
            title: '',
            rec: '0',
            original: '0',
            showtime: '2019-07-17 03:00:43.0',
            priv: '0',
            replycnt: '29',
            datetime: '2019-07-17 03:00:43.0'
          },
          {
            picpath:
              'http://jhyiyan.oss-cn-beijing.aliyuncs.com/2019/07/16/09fb4bd5543898386c79d6d37acd9a04.jpg',
            ava: '1',
            commentcnt: '4',
            commercialtag: '-1.0',
            from: '',
            originbook: {
              bookid: '2',
              ava: '1',
              bookname: ' '
            },
            textcardid: '2995745',
            fonttype: '2',
            creator: {
              uid: '9999',
              username: '一言',
              device: '0',
              gender: 'M',
              fanscnt: '0',
              smallavatar:
                'http://115.28.168.103:8080/yiyanpic/avatar/2015/06/22/26de07660a311398e1a2ec419df7575d_.jpg',
              largeavatar:
                'http://115.28.168.103:8080/yiyanpic/avatar/2015/06/22/26de07660a311398e1a2ec419df7575d.jpg'
            },
            content: '',
            feedid: '7193228',
            category: '100002',
            title: '用“暗语”和“风”写一首小诗',
            rec: '0',
            moretagstring: '',
            original: '1',
            showtime: '2019-07-16 20:24:42.0',
            priv: '2',
            replycnt: '548',
            datetime: '2019-07-16 20:24:42.0'
          },
          {
            picpath:
              'http://jhyiyan.oss-cn-beijing.aliyuncs.com/2019/07/16/d35873ceaed5031c869e316a5244ba0f.jpg',
            ava: '1',
            commentcnt: '397',
            commercialtag: '-1.0',
            from: '《美食、祈祷和恋爱》',
            originbook: {
              picpath:
                'http://115.28.168.103:8080/yiyanpic/pic/2015/07/16/5a5e712609939bbaa67581c19e7ef9b0.jpg',
              bookid: '119',
              ava: '1',
              cardcnt: '1041',
              bookname: '给你的情书'
            },
            textcardid: '2995720',
            fonttype: '3',
            collectcnt: '193',
            dislikecnt: '2',
            creator: {
              uid: '9999',
              username: '一言',
              device: '0',
              gender: 'M',
              fanscnt: '0',
              smallavatar:
                'http://115.28.168.103:8080/yiyanpic/avatar/2015/06/22/26de07660a311398e1a2ec419df7575d_.jpg',
              largeavatar:
                'http://115.28.168.103:8080/yiyanpic/avatar/2015/06/22/26de07660a311398e1a2ec419df7575d.jpg'
            },
            content:
              'Sometimes to lose balance for love is part of living balanced life.\n有时候因为爱失去平衡，也是平衡生活的一部分。',
            feedid: '7193159',
            category: '3',
            title: '',
            rec: '0',
            original: '0',
            priv: '0',
            replycnt: '16',
            datetime: '2019-07-16 20:20:06.0'
          }
        ]
      },
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
    }
  },
  mounted () {
    // 加载后滚动条滚动一定距离并禁止scroll
    this.fixedScroll()
    // 计算并初始化数据，为滚动动画做准备
    this.initForAnimate()
    // 指定动画进行到结尾处
    this.animateByScroll(scrollX)
  },
  methods: {
    initForAnimate () {
      // 每个li容器的高度和li节点缓存到实例上，为了以后计算高度做准备
      this.itemHeight = this.$refs.itemlist.clientHeight / 13
      // 将dom缓存起来
      this.items = this.$refs.itemlist.querySelectorAll('li')
    },
    scroll (e) {
      const x = e.x
      // 持续的动画执行时，会disable scroll,当scroll回滚到0的时候，让其启用
      if (x === 0) {
        this.$refs.baseScroll.enable()
      }
      // 如果滚动时间小于300ms,不传递scroll的值到动画
      if (new Date().getTime() - this.scrollBeginTime < 300) {
        // 如果滚动的距离大于20，滚动到固定值
        if (x > 40) {
          this.fixedScroll()
          this.animateByScroll(scrollX)
          // this.fixedAmimation()
        }
        return
      }
      if (x < 0 || x > scrollX) return
      this.animateByScroll(x)
    },
    // 滚动开始前记录当前时间
    beforeScroll () {
      this.scrollBeginTime = new Date().getTime()
      // 滚动之前将滚动项顺序打乱
      this.list.sort(() => 0.5 - Math.random())
      // dom更新后将其缓存起来
      this.$nextTick(function () {
        this.items = this.$refs.itemlist.querySelectorAll('li')
      })
    },
    // 根据scroll值进行动画
    animateByScroll (val) {
      this.items.forEach((item, index) => {
        const rate = val / scrollX
        const x = animationX + this.list[index][4]
        const y =
          this.list[index][2] * this.itemHeight -
          index * this.itemHeight -
          this.list[index][3]
        const rotate = this.list[index][1]
        const opacity = 0.9
        if (val > scrollX) {
          return
        }
        this.$anime.set(item, {
          translateX () {
            return x * rate
          },
          translateY () {
            return y * rate
          },
          rotate () {
            return rotate * rate
          },
          opacity () {
            return opacity * rate
          }
        })
      })
    },
    // 固定的滚动距离
    fixedScroll () {
      this.$refs.baseScroll.scrollTo(90, 0, 1000)
      // disable： DOM 事件（如 touchstart、touchmove、touchend）的回调函数不再响应。scroll事件不影响，所以回弹的时候，会传递scrollDistance
      this.$refs.baseScroll.disable()
    }
    // 固定的动画
    // fixedAmimation () {
    //   this.items.forEach((item, index) => {
    //     const x = animationX + this.list[index][4]
    //     const y =
    //       this.list[index][2] * this.itemHeight -
    //       index * this.itemHeight -
    //       this.list[index][3]
    //     this.$anime({
    //       targets: item,
    //       translateX: x,
    //       translateY: y,
    //       rotate: this.list[index][1],
    //       duration: 1000,
    //       opacity: 1,
    //       direction: 'normal',
    //       easing: 'easeOutCubic'
    //     })
    //   })
    // }
  },
  components: { BaseScroll }
}
</script>
<style lang='stylus' scoped>
.scroll-content
  display inline-flex
  align-items center
ul
  width 200px
  margin-left -200px
  display grid
  grid-template-columns 5px
  grid-template-rows repeat(13, 1fr)
  align-items center
li
  opacity 0
  background #888888
  width 5px
</style>
