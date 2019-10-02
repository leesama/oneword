<template>
  <footer class="detail-footer border-top">
    <router-link
      ref="icons"
      :key="index"
      class="tab"
      :to="item.tabTo"
      @click.native="handleTabClick(index)"
      tag="div"
      v-for="(item,index) of tab"
    >
      <i :class="calIconClass(index)" class="iconfont" />
    </router-link>
    <router-link to="/new-word" tag="div" class="tab">
      <i class="iconfont icon-jia" />
    </router-link>
  </footer>
</template>

<script>
export default {
  name: 'the-footer',
  data() {
    return {
      tab: [
        { tabTo: '/', tabIcon: 'icon-home' },
        { tabTo: '/explore', tabIcon: 'icon-sousuo' },
        { tabTo: '/message', tabIcon: 'icon-message' },
        { tabTo: '/mine', tabIcon: 'icon-wode' }
      ],
      selectTab: 0
    }
  },
  mounted() {},
  methods: {
    // 计算图标classname，点击后的图标名称为原图标+click
    calIconClass(i) {
      return i === this.selectTab
        ? `${this.tab[i].tabIcon}click`
        : this.tab[i].tabIcon
    },
    handleTabClick(i) {
      if (i === this.selectTab) {
        return
      }
      // css切换之后再进行动画,这里如果在切换的css上添加animation，第一个元素初次加载也会显示动画，设定中初次加载第一个元素不显示动画,直接操作dom
      const icon = this.$refs.icons[i].$el.children[0]
      this.selectTab = i

      this.$anime({
        targets: icon,
        scale: 1.2,
        easing: 'easeInOutExpo',
        direction: 'alternate',
        duration: 300
      })
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~@common/stylus/mixins.styl'
i
  font-size 70px
.tab
  flex 1
  center()
  &:last-child i
    font-size 110px
.detail-footer
  z-index 2
  position fixed
  bottom 0
  left 0
  right 0
  display flex
  height 145px
  background-color rgba(242, 242, 242, 0.9)
  box-shadow '0px' '2px' '5px' '5px' #dddddd
</style>
