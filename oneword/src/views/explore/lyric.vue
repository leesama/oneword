<template>
  <div class="lyric">
    <scroll-cards
      :cardListData="lyricCardInfo"
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
import { getLyricTextCard } from '@models/'
import ScrollCards from '@components/scroll/scroll-y/scroll-y-cards.vue'
export default {
  name: 'lyric',
  mixins: [cardsCommon],
  methods: {
    async handlePulldown() {
      const { data } = await getLyricTextCard()
      this.setCardInfo({
        type: 'lyric',
        info: data.textcardlist
      })
    },
    async handlePullUp(time) {
      const { data } = await getLyricTextCard(time)
      this.setCardInfo({
        type: 'lyric',
        info: this.lyricCardInfo.concat(data.textcardlist)
      })
    }
  },
  computed: { ...mapGetters(['lyricCardInfo']) },
  components: { ScrollCards }
}
</script>
<style lang='stylus' scoped></style>
