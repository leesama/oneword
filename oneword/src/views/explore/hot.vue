<template>
  <div class="hot">
    <scroll-cards
      :cardListData="hotCardInfo"
      @cardContainerShow="handleCardContainerShow"
      @cardContainerClose="handleCardContainerClose"
      @pullUp="handlePullUp"
      @pullDown="handlePulldown"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { cardsCommon } from '@mixins/cardPage.js'
import { getHotTextCard } from '@models/'
import ScrollCards from '@components/scroll/scroll-y/scroll-y-cards.vue'
export default {
  name: 'hot',
  mixins: [cardsCommon],
  methods: {
    async handlePulldown() {
      const { data } = await getHotTextCard()
      this.setCardInfo({
        type: 'hot',
        info: data.textcardlist
      })
    },
    async handlePullUp(time) {
      const { data } = await getHotTextCard(time)
      this.setCardInfo({
        type: 'hot',
        info: this.hotCardInfo.concat(data.textcardlist)
      })
    }
  },
  computed: { ...mapGetters(['hotCardInfo']) },
  components: { ScrollCards }
}
</script>
<style lang='stylus' scoped>
.hot
  height 100%
</style>
