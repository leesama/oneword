<template>
  <div class="movie">
    <scroll-cards
      :cardListData="movieCardInfo"
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
import { getMovieTextCard } from '@models/'
import ScrollCards from '@components/scroll/scroll-y/scroll-y-cards.vue'
export default {
  name: 'movie',
  mixins: [cardsCommon],
  methods: {
    async handlePulldown() {
      const { data } = await getMovieTextCard()
      this.setCardInfo({
        type: 'movie',
        info: data.textcardlist
      })
    },
    async handlePullUp(time) {
      const { data } = await getMovieTextCard(time)
      this.setCardInfo({
        type: 'movie',
        info: this.movieCardInfo.concat(data.textcardlist)
      })
    }
  },
  computed: { ...mapGetters(['movieCardInfo']) },
  components: { ScrollCards }
}
</script>
<style lang='stylus' scoped></style>
