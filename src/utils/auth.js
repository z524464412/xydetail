import Cookies from 'js-cookie'
import axios from "axios";
import { httpUrl } from '@/config/env'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

/**
 * 创建访问令牌
 */
export const createAccessToken = async () => {
  try {
    let res = await axios({
     // baseURL: httpUrl,
      url: '/api/access/token/create.htm',
      method: 'post',
      headers: {
        'TBase-Access-Origin': "WechatWeb"
      }
    })
    res = res.data
    if(res.status.toLowerCase() === 'success') {
      await setToken(res.data.token)
      return Promise.resolve(res.data.token)
    } else {
      return Promise.reject(res)
    }
  } catch (e) {
    console.error('创建令牌失败', e)
  }
}

/**
 * 获取访问令牌
 */
export const getAccessToken = async () => {
  try {
    let token = await getToken(TokenKey)
    if(!token) {
      token = await createAccessToken()
    }
    console.log('获取访问令牌成功：', token)
    return token
  } catch (e) {
    console.error('获取访问令牌失败：', e)
  }
}

/**
 * 创建访问令牌
 */
export const getPDFURL = async (param) => {
  try {
    let res = await axios({
      // baseURL: httpUrl,
      url: '/vip/getPdfUrl.htm',
      method: 'post',
      data:param,
      headers: {
        'TBase-Access-Origin': "WechatWeb",
        'Content-Type':'application/x-www-form-urlencoded',
        'TBase-Access-Token': getAccessToken()
      }
    })
    res = res.data
    if(res.status.toLowerCase() === 'success') {
      return Promise.resolve(res)
    } else {
      return Promise.reject(res)
    }
  } catch (e) {
    console.error('获取pdf的URL失败', e)
  }
}
