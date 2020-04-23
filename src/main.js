import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false


import {BootstrapVue, IconsPlugin} from "bootstrap-vue";
// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
import "./styles.scss"

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
