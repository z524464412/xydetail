import axios from 'axios'
import store from '@/store'
import { httpUrl } from '@/config/env'
import { Toast,Indicator} from 'mint-ui';
import * as auth from './auth'

// create an axios instance
const service = axios.create({
  //baseURL: httpUrl, // api 的 base_url
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  async (config) => {
    // Do something before request is sent
    config.headers['TBase-Access-Token'] = await auth.getAccessToken();
    config.headers['TBase-Access-Origin'] = 'WechatWeb';
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  //response => response,
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过 xmlhttprequest 来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   * code为0 表示请求成功，不为0，表示失败，弹出message信息。有特殊code，如102，用户尚未登录，需要前端处理的，请特殊处理，code不会重复
   */
  response => {
    const res = response.data
    let {status} = res
    if(status.toLowerCase() === 'success') {
      return Promise.resolve(res.data || res)
    } else if (status === 'tokenExpire') {
      auth.createAccessToken()        // 令牌过期，重新请求
      window.location.reload();
      return Promise.reject(res)
    } else if (status === 'error'){    // 接口返回状态字段返回error
      return Promise.reject(res)
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    Toast({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
