import { mapGetters, mapMutations } from 'vuex'

export const vuexMethondAndGetter = {
  computed: {
    ...mapGetters({ userInfo: 'userInfoAndBookList' })
  },
  methods: {
    ...mapMutations({ setUserInfoAndBookList: 'SET_USERINFO_AND_BOOKLIST' })
  }
}
