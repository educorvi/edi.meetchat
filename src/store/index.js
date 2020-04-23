import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    chats: [
      {
        name: "Julian",
        url: "https://files.jp-studios.de/1"
      },
      {
        name: "Große Gruppe",
        url: "https://files.jp-studios.de/2"
      },
      {
        name: "Kleine Gruppe",
        url: "https://files.jp-studios.de/3"
      }
    ],
    activeChat: null
  },
  mutations: {
    setActiveChat(state, c) {
      state.activeChat = c;
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    chats: state => state.chats,
    activeChat: state => state.activeChat
  }
})
