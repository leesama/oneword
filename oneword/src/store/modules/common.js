import * as types from '../mutation-types'
const common = {
  state: { errorLoadingVisible: false },
  mutations: {
    [types.SET_ERROR_VISIBLE](state, visible) {
      state.errorLoadingVisible = visible
    }
  }
}
export default common
