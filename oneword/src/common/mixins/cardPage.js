import { mapMutations } from 'vuex'

const cardsCommon = {
  methods: {
    ...mapMutations({ setCardInfo: 'SET_CARDS_INFO' }),
    handleCardContainerShow() {
      this.$emit('cardContainerShow')
    },
    handleCardContainerClose() {
      this.$emit('cardContainerClose')
    }
  }
}
export { cardsCommon }
