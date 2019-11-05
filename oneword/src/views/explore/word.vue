<template>
  <div class="word">
    <scroll-cards
      :cardListData="wordCardInfo"
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
import { getWordTextCard } from '@models/'
import ScrollCards from '@components/scroll/scroll-y/scroll-y-cards.vue'
export default {
  name: 'word',
  mixins: [cardsCommon],
  methods: {
    async handlePulldown() {
      const { data } = await getWordTextCard()
      this.setCardInfo({
        type: 'word',
        info: data.textcardlist
      })
    },
    async handlePullUp(time) {
      const { data } = await getWordTextCard(time)
      this.setCardInfo({
        type: 'word',
        info: this.wordCardInfo.concat(data.textcardlist)
      })
    }
  },
  computed: { ...mapGetters(['wordCardInfo']) },
  components: { ScrollCards }
}
</script>
<style lang='stylus' scoped></style>
