import axios from 'axios'
import * as util from '../config/mUtils'
import { Toast,Indicator} from 'mint-ui';
import { httpUrl } from '@/config/env'
const instance = axios.create({
  baseURL:httpUrl,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  timeout: 100000
});
let loading ;
//显示loading
function startLoading() {
  Indicator.open('加载中...');
}
//关闭loading
function endLoading() {
  Indicator.close();
}
//判断显示loading
 let needLoadingRequestCount = 0
  function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading()
  }
  needLoadingRequestCount++
}

//判断关闭loding
function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
} 
// instance.defaults.headers.post['Content-Type'] = 'application/json';
// instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 设置token请求头
// instance.defaults.headers.common['Authorization'] = 'qweqwe';
axios.defaults.transformRequest = [function(data) {
  let ret = ''
  for (let it in data) {
    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
  }
  return ret
}],
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  showFullScreenLoading();
  let token=util.getStorage('dingToken');
  if(config.method=='post'){
    // config.headers.token=token;
    // if(config.url.indexOf('?')>-1){
    //   config.url=config.url+"&token="+token;
    // }else{
    //   config.url=config.url+"?token="+token;
    // }
    
  }
  if (config.method=='get' && config.params) {
    config.params['token'] =token;
  }
  return config;

}, function (error) {
  endLoading();
  tryHideFullScreenLoading();
  // 对请求错误做些什么
  return Promise.reject(error);
});
//错误处理

instance.interceptors.response.use(function(response) {
  tryHideFullScreenLoading();
	if(response.data.status == 'success' || response.data.status == 'SUCCESS'){
    let data= response.data || [];
    return   Promise.resolve(data);
	}else if(response.data.respCode == 100){
		// window.location.href =  window.location.origin+'/#/grant'
	}else if(response.data.respCode == 10){
		Toast({
		  message: '登录状态已过去,刷新重试!',
		  position: 'middle',
		  duration: 2000
		});
    location.reload();
	}else{
    Toast({
      message: response.data.message,
      position: 'middle',
      duration: 2000
    });
  }
}, util.catchError);

export default instance;
