<template>
  <div class="origin">
    <scroll-cards
      :cardListData="originCardInfo"
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
import { getOriginTextCard } from '@models/'
import ScrollCards from '@components/scroll/scroll-y/scroll-y-cards.vue'
export default {
  name: 'origin',
  mixins: [cardsCommon],
  methods: {
    async handlePulldown() {
      const { data } = await getOriginTextCard()
      this.setCardInfo({
        type: 'origin',
        info: data.textcardlist
      })
    },
    async handlePullUp(time) {
      const { data } = await getOriginTextCard(time)
      this.setCardInfo({
        type: 'origin',
        info: this.originCardInfo.concat(data.textcardlist)
      })
    }
  },
  computed: { ...mapGetters(['originCardInfo']) },
  components: { ScrollCards }
}
</script>
<style lang='stylus' scoped></style>
