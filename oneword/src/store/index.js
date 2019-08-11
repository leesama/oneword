import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import actions from './actions'
import common from './modules/common'
import dom from './modules/dom'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    common,
    dom
  },
  getters,
  actions
})
