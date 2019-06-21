/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 *
 */

let baseUrl = '';
// let routerMode = 'history';
let routerMode = 'hash';
// let imgBaseUrl = 'http://img.tifangedu.com/';
let httpUrl = ''
switch(process.env.srconfig){
	//测试环境
	case 'dev':
		httpUrl = ''
		break;
	//预生产环境
	case 'beta':
		httpUrl = 'http://10.1.14.25:9527'
		break;
	//生产环境
	case 'pro':
		httpUrl = 'http://10.1.14.25:9527'
		break;
	//默认开发
	default:
    baseUrl = location.href;
		break
}
if (process.env.NODE_ENV == 'development') {

}else if(process.env.NODE_ENV == 'production'){
	baseUrl = location.href;
}

export {
	baseUrl,
	routerMode,
	// imgBaseUrl,
	httpUrl
}
