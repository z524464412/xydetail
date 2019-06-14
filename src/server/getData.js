import instance from './index';


//扫码之后的详情
export const getCodeInfo = params => instance.get('/vip/codeInfo.htm',{params});

// 获取pdfOss地址
export const getPdfUrl = params => instance.post('/vip/getPdfUrl.htm',params);

// 获取产品详情

export const getProduct = params => instance.get('/vip/getProduct.htm',{params});

// 获取有害物质详情

export const getHarmful = params => instance.get('/vip/getHarmful.htm',{params});

// 获取有害物质详情

export const getwxcode = params => instance.get('/vip/wxcode.htm',{params});

// 获取子材料的物流信息

export const getSubScanInfo = params => instance.get('/vip/getSubScanInfo.htm',{params});

// 获取子材料的详情
/**
 * item.id=18&skuId=174
 */

export const getSubInfo = params => instance.get('/vip/getSubInfo.htm',{params});



