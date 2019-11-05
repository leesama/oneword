<template>
  <div class="quotation">
    <scroll-cards
      :cardListData="quotationCardInfo"
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
import { getQuotationTextCard } from '@models/'
import ScrollCards from '@components/scroll/scroll-y/scroll-y-cards.vue'
export default {
  name: 'quotation',
  mixins: [cardsCommon],
  methods: {
    async handlePulldown() {
      const { data } = await getQuotationTextCard()
      this.setCardInfo({
        type: 'quotation',
        info: data.textcardlist
      })
    },
    async handlePullUp(time) {
      const { data } = await getQuotationTextCard(time)
      this.setCardInfo({
        type: 'quotation',
        info: this.quotationCardInfo.concat(data.textcardlist)
      })
    }
  },
  computed: { ...mapGetters(['quotationCardInfo']) },
  components: { ScrollCards }
}
</script>
<style lang='stylus' scoped></style>
