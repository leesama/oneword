import * as types from '../mutation-types'
const common = {
  state: { loadingMaskVisible: false, userInfoAndBookList: null },
  mutations: {
    [types.SET_LOADING_MASK_VISIBLE](state, visible) {
      state.loadingMaskVisible = visible
    },
    [types.SET_USERINFO_AND_BOOKLIST](state, info) {
      state.userInfoAndBookList = info
    },
    [types.RESET_COMMON_STATE](state) {
      Object.assign(state, JSON.parse(localStorage.getItem('initState')).common)
    }
  }
}
export default common
