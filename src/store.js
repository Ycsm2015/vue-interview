import Vue from 'vue'
import Vuex from 'vuex'
import mockGenerator from './mock'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dataList: []
  },
  mutations: {
    addData: (state, arr) => {
      state.dataList = [...state.dataList, ...arr]
    }
  },
  getters: {
    getAverage: state => (state.dataList.reduce((amount, { data: n }) => amount + n, 0) / state.dataList.length).toFixed(2),
    getData: state => state.dataList
  },
  actions: {
    async getDataCall (context) {
      // TODO
      let startIndex = context.state.dataList.length
      let length = startIndex + Math.random() * 20
      context.commit('addData', await mockGenerator(startIndex, length))
    }
  }
})
