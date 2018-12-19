import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import VueCookie from 'vue-cookie'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlayCircle, faCheck, faTimes, faPauseCircle } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faPlayCircle, faCheck, faTimes, faPauseCircle)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false
Vue.use(VueCookie)

new Vue({
  render: h => h(App)
}).$mount('#app')

