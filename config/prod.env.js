'use strict'
var buildtype = process.argv.slice(2)[0]
console.log('~~~~~~~~~~start build~~~~~~~~~' +buildtype)
var obj = {
	NODE_ENV:'"production"'
}
switch (buildtype){
	//生产
	case 'pro':
		process.env.srconfig = 'pro'
		obj.srconfig = '"pro"'
		break;
	//外网开发
	case 'beta':
		process.env.srconfig = 'beta'
		obj.srconfig = '"beta"'
		break
	//内网开发
	case 'dev':
		process.env.srconfig = 'dev'
		obj.srconfig = '"dev"'
		break
	//测试
	case 'testdev':
		process.env.srconfig = 'testdev'
		obj.srconfig = '"testdev"'
		break
	//默认开发
	default:
		process.env.srconfig = ''
		obj.srconfig = '""'
		break
}
module.exports = obj;
// module.exports = {
//   NODE_ENV: '"production"'
// }
