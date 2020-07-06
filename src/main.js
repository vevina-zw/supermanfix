import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//import axios from 'axios'
//封装过得axios
import axios from './http'
import utils from './utils'

//font-awesome
import 'font-awesome/css/font-awesome.min.css'

//mint-ui
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(Mint);
// import { DatetimePicker,Toast,Popup,Picker  } from 'mint-ui';

//前端适配 px→rem
import Flexible from '../public/flexible'
// import Flexible from '../public/unit'
Vue.use(Flexible);

// 全局组件
import Toast from './components/toast/index'
Vue.use(Toast);
import Login from './components/loginToast/index'
Vue.use(Login);

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.$utils = utils;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
