<template>
  <div class="all">
    <scroll-cards
      :cardListData="allCardInfo"
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
import { getAllTextCard } from '@models/'
import ScrollCards from '@components/scroll/scroll-y/scroll-y-cards.vue'
export default {
  name: 'all',
  mixins: [cardsCommon],
  methods: {
    async handlePulldown() {
      const { data } = await getAllTextCard()
      this.setCardInfo({
        type: 'all',
        info: data.textcardlist
      })
    },
    async handlePullUp(time) {
      const { data } = await getAllTextCard(time)
      this.setCardInfo({
        type: 'all',
        info: this.allCardInfo.concat(data.textcardlist)
      })
    }
  },
  computed: { ...mapGetters(['allCardInfo']) },
  components: { ScrollCards }
}
</script>
<style lang='stylus' scoped></style>
