import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import actions from './actions'
import common from './modules/common'
import music from './modules/music'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    common,
    music
  },
  getters,
  actions
})
