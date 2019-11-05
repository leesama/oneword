<template>
  <div class="poem">
    <scroll-cards
      :cardListData="poemCardInfo"
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
import { getPoemTextCard } from '@models/'
import ScrollCards from '@components/scroll/scroll-y/scroll-y-cards.vue'
export default {
  name: 'poem',
  mixins: [cardsCommon],
  methods: {
    async handlePulldown() {
      const { data } = await getPoemTextCard()
      this.setCardInfo({
        type: 'poem',
        info: data.textcardlist
      })
    },
    async handlePullUp(time) {
      const { data } = await getPoemTextCard(time)
      this.setCardInfo({
        type: 'poem',
        info: this.poemCardInfo.concat(data.textcardlist)
      })
    }
  },
  computed: { ...mapGetters(['poemCardInfo']) },
  components: { ScrollCards }
}
</script>
<style lang='stylus' scoped></style>
