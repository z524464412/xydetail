import request from '@/utils/request'
import * as auth from '../utils/auth'
import axios from "axios";

/**
 * 根据skuId查询首页大部分数据
 * @param skuId
 */
export function getProductBySkuId(skuId) {
  return request({
    url: '/api/v1/products/infor?skuId=' + skuId,
    method: 'get',
  })
}

/**
 * @param param
 */
export function getwxcode(param) {
  return request({
    url: '/vip/wxcode.htm',
    method: 'get',
    param
  })
}

/**
 * 根据skuId查询有害数据列表
 * @param skuId
 */
export function getHarmfulListByShuId(skuId) {
  return request({
    url: '/api/v1/products/harmful?skuId=' + skuId,
    method: 'get',
  })
}

/**
 * 根据skuId查询证书
 * @param skuId
 */
export function getCertificatesListByShuId(skuId) {
  return request({
    url: '/api/v1/products/certificate?skuId=' + skuId,
    method: 'get',
  })
}


/**
 * 根据skuId查询产品相关视频
 * @param skuId
 */
export function getProductVideoBySkuId(skuId) {
  return request({
    url: '/api/v1/products/videos?skuId=' + skuId,
    method: 'get',
  })
}

/**
 * 根据skuId查询产品相关案例
 * @param skuId
 */
export function getProductCasesBySkuId(skuId) {
  return request({
    url: '/api/v1/products/cases?skuId=' + skuId,
    method: 'get',
  })
}

/**
 * 根据skuId查询产品详情
 * @param skuId
 */
export function getProductInfoBySkuId(skuId) {
  return request({
    url: '/api/v1/products/details?skuId=' + skuId,
    method: 'get',
  })
}


/**
 * 根据id查询富文本内容
 * @param skuId
 */
export function getArticleById(id) {
  return request({
    url: '/api/v1/products/showDetail?showId=' + id,
    method: 'get',
  })
}

/**
 * 根据skuId查询科普知识
 * @param skuId
 */
export function getKnowledgeListBySkuId(skuId) {
  return request({
    url: '/api/v1/products/articles?skuId=' + skuId,
    method: 'get',
  })
}

/**
 * 根据skuId查询定制家具
 * @param skuId
 */
export function getMakeupsBySkuId(skuId) {
  return request({
    url: '/api/v1/products/makeups?skuId=' + skuId,
    method: 'get',
  })
}
