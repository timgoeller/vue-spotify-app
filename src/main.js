import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import VueCookie from 'vue-cookie'
import Spotify from 'spotify-web-api-node'
import VueSpotify from 'vue-spotify'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlayCircle } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faPlayCircle)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false
Vue.use(VueCookie)
var urlSplit =  window.location.href.split("/");
Vue.use(VueSpotify, new Spotify({redirectUri: 'http://localhost:8080/', clientId: 'eea843d7416f4a66bbf7192d8c817caf'}))

new Vue({
  render: h => h(App)
}).$mount('#app')

