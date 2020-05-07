import Vue from 'vue'
import App from './App.vue'
import store from './store'
import axios from "axios"

Vue.config.productionTip = false

Vue.prototype.http = axios;

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
