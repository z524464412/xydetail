// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import MintUI from 'mint-ui'
import App from './App'
import router from './router'
import store from './store/'
import FastClick from 'fastclick'
import { Collapse, CollapseItem } from 'element-ui';


import 'mint-ui/lib/style.css'
import vmodal from 'vue-js-modal'
// import '@/config/vconsole'
import '@/assets/js/zepto.min.js'
import {
  init_platform //判断什么设备
} from "@/config/mUtils";
Vue.config.productionTip = false
Vue.use(MintUI);
Vue.use(vmodal);
Vue.use(Collapse);
Vue.use(CollapseItem)

Vue.directive('anchor',{
  inserted : function(el,binding){
    el.onclick = function(){
      document.documentElement.scrollTop = $('#'+binding.value).offset().top - 50
    }
  }
})

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}
router.beforeEach((to, from, next) => {
  if (from.path == '/pdf') {
    let platform = init_platform();
    if (platform == "wx") {
      // let appId = "wxc6b8bf1e61218101";
      // let url =
      //   "http://" +
      //   window.location.hostname +
      //   window.location.pathname +
      //   window.location.search;
      // let svc =
      //   "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
      //   appId +
      //   "&redirect_uri=" +
      //   encodeURIComponent(url) +
      //   "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
      // window.location.href = svc;
    }
    next();
  }
  next();
})
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>',
  created() {
    //
  },
  mounted: function () {

  }
})
