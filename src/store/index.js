import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    version: process.env.PACKAGE_VERSION ||'0.0.0',
    chats: [
      {
        name: "Julian",
        url: "https://testuser:testabc123@couch.kraeks.de/classroomchat_547a3ea1533a45b69221fc0d9e156b18"
      },
      {
        name: "Große Gruppe",
        url: "https://testuser:testabc123@couch.kraeks.de/classroomchat_547a3ea1533a45b69221fc0d9e156b18"
      },
      {
        name: "Kleine Gruppe",
        url: "https://testuser:testabc123@couch.kraeks.de/classroomchat_cab8d5d8529047af882e2258e5698d27"
      }
    ],
    activeChat: null,
    messages: [],
  },
  mutations: {
    setActiveChat(state, c) {
      state.activeChat = c;
    },
    setMessages(state, m) {
      state.messages = m;
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    chats: state => state.chats,
    activeChat: state => state.activeChat,
    version: state => state.version,
    messages: state => state.messages
  }
})
